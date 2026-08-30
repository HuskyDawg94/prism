# Validation scripts

`calibration_analysis.py` — computes a reliability diagram, Brier score, and
Expected Calibration Error (ECE) for PRISM's per-finding `confidenceScore`
field against a ground-truth correct/incorrect label. See the script's
docstring for the expected input CSV format and current status (mechanism
only — not yet run against real validation data as of v0.3.0).

```
pip install -r requirements.txt
python calibration_analysis.py findings.csv --out calibration_curve.png
```
