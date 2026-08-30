#!/usr/bin/env python3
"""
Confidence-calibration analysis for PRISM findings.

Status: MECHANISM ONLY — not yet run against real data. PRISM's two existing
validation studies (McCormick & Kievit 2023; Abi-Dargham et al. 2023) were
scored for aggregate F1/precision/recall/AUC, but no per-item table pairing
each individual finding with an expert-confirmed/novel label was retained.
Per-item `confidenceScore` fields were added to every module's output schema
in v0.3.0 with no calibration claim attached to them yet.

This script is the tool the next full validation pass should run: feed it a
CSV of individual findings with their confidenceScore and a ground-truth
label, and it produces the actual calibration curve (predicted confidence
vs. empirical accuracy per bin) plus Brier score and ECE (Expected
Calibration Error) — the standard summary metrics for this kind of check.

Usage
-----
    python calibration_analysis.py findings.csv --out calibration_curve.png

Expected input CSV columns
---------------------------
    module            e.g. "absenceMapping", "tensionTopology", ...
    confidence_score  integer 0-100, PRISM's own emitted confidenceScore
    correct           1 if expert-confirmed / ground-truth-matched, 0 if not
                       (e.g. "novel"/unmatched items in the existing
                       validation studies would be scored case-by-case —
                       decide before running whether "novel" counts as
                       correct-but-unconfirmed or as a separate class; this
                       script assumes a binary label has already been
                       decided upstream)

Output
------
    - Printed summary: overall Brier score, overall ECE, per-module ECE
    - A reliability diagram (predicted confidence bin vs. empirical accuracy)
      saved to the path given by --out
"""
import argparse
import sys

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


def compute_calibration(df: pd.DataFrame, n_bins: int = 10):
    """Bin findings by confidence_score and compute empirical accuracy per bin.

    Returns a DataFrame with one row per non-empty bin: bin_center,
    mean_confidence, empirical_accuracy, n, plus overall Brier score and ECE.
    """
    df = df.copy()
    df["confidence_frac"] = df["confidence_score"] / 100.0
    bin_edges = np.linspace(0, 1, n_bins + 1)
    df["bin"] = pd.cut(df["confidence_frac"], bin_edges, include_lowest=True)

    rows = []
    ece = 0.0
    n_total = len(df)
    for b, g in df.groupby("bin", observed=True):
        if len(g) == 0:
            continue
        mean_conf = g["confidence_frac"].mean()
        emp_acc = g["correct"].mean()
        n = len(g)
        rows.append({
            "bin": str(b),
            "mean_confidence": mean_conf,
            "empirical_accuracy": emp_acc,
            "n": n,
        })
        ece += (n / n_total) * abs(mean_conf - emp_acc)

    brier = np.mean((df["confidence_frac"] - df["correct"]) ** 2)
    return pd.DataFrame(rows), brier, ece


def plot_reliability_diagram(bin_df: pd.DataFrame, out_path: str, overall_ece: float, overall_brier: float):
    fig, ax = plt.subplots(figsize=(6, 6))
    ax.plot([0, 1], [0, 1], linestyle="--", color="gray", label="Perfect calibration")
    ax.scatter(bin_df["mean_confidence"], bin_df["empirical_accuracy"],
               s=bin_df["n"] * 4 + 20, alpha=0.8, color="#4af2a1", edgecolor="black",
               label="PRISM findings (size = bin count)")
    ax.set_xlabel("Mean predicted confidence")
    ax.set_ylabel("Empirical accuracy (expert-confirmed rate)")
    ax.set_title(f"PRISM confidence calibration\nECE={overall_ece:.3f}, Brier={overall_brier:.3f}")
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.legend(loc="upper left", fontsize=9)
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    print(f"Saved reliability diagram to {out_path}")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input_csv", help="CSV with columns: module, confidence_score, correct")
    parser.add_argument("--out", default="calibration_curve.png", help="Output path for reliability diagram")
    parser.add_argument("--bins", type=int, default=10, help="Number of confidence bins (default 10)")
    args = parser.parse_args()

    df = pd.read_csv(args.input_csv)
    required = {"module", "confidence_score", "correct"}
    missing = required - set(df.columns)
    if missing:
        sys.exit(f"Input CSV is missing required columns: {missing}")

    bin_df, brier, ece = compute_calibration(df, n_bins=args.bins)
    print("=== Overall calibration ===")
    print(f"n = {len(df)}, Brier score = {brier:.4f}, ECE = {ece:.4f}")
    print()
    print("=== Per-module ECE ===")
    for module, g in df.groupby("module"):
        _, m_brier, m_ece = compute_calibration(g, n_bins=args.bins)
        print(f"{module}: n={len(g)}, Brier={m_brier:.4f}, ECE={m_ece:.4f}")

    plot_reliability_diagram(bin_df, args.out, ece, brier)


if __name__ == "__main__":
    main()
