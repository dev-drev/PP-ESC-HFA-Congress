"use client";

import { useState } from "react";

// ROBERT  

export default function ReferencesButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 px-10 py-4 pb-5 text-white bg-[#066368] w-full relative text-center border-b border-white/30"
      >
        References
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl overflow-hidden w-full overflow-y-auto max-h-[calc(100vh-300px)] ">
            <div className="px-6 py-6 text-black">
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Safety Information
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Very common AEs:</h4>
                    <p className="mb-2">
                      <strong>Volume depletion:</strong> The frequency was
                      increased in patients aged 75 years and older (JARDIANCE
                      <sup>®</sup> 10 mg 2.3% vs placebo 2.1%) compared to
                      overall (JARDIANCE<sup>®</sup> 10 mg 0.6% vs placebo
                      0.3%).
                    </p>
                    <p>
                      <strong>
                        Hypoglycaemia (when used with a sulphonylurea or
                        insulin):
                      </strong>{" "}
                      A lower dose of the sulphonylurea or insulin may be
                      considered to reduce the risk.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Common AEs:</h4>
                    <p>
                      Vaginal moniliasis, vulvovaginitis, balanitis and other
                      genital infection; Urinary tract infection (including
                      pyelonephritis and urosepsis); thirst, constipation,
                      pruritus (generalised); rash; increased urination; serum
                      lipids increased.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Uncommon AEs:</h4>
                    <p>
                      Ketoacidosis; urticaria; angioedema; dysuria; blood
                      creatinine increased/glomerular filtration rate decreased;
                      hematocrit increased.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Rare AEs:</h4>
                    <p>
                      Necrotising fasciitis of the perineum (Fournier's
                      gangrene).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Very rare AEs:</h4>
                    <p>Tubulointerstitial nephritis.</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Indication</h3>
                <div className="text-sm space-y-2">
                  <p>
                    JARDIANCE<sup>®</sup> is indicated for the treatment of
                    adults and children aged 10 years and above for the
                    treatment of insufficiently controlled type 2 diabetes
                    mellitus as an adjunct to diet and exercise
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      as monotherapy when metformin is considered inappropriate
                      due to intolerance
                    </li>
                    <li>
                      in addition to other medicinal products for the treatment
                      of diabetes
                    </li>
                  </ul>
                  <p>
                    JARDIANCE<sup>®</sup> is indicated in adults for the
                    treatment of symptomatic chronic heart failure.
                  </p>
                  <p>
                    JARDIANCE<sup>®</sup> is indicated in adults for the
                    treatment of chronic kidney disease.<sup>10</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Footnotes</h3>
                <div className="text-xs space-y-2">
                  <p>
                    <sup>*</sup>
                    In the EMPEROR-Reduced trial, a randomised, double-blind,
                    parallel-group, placebo-controlled study of 3730 patients
                    with HFrEF, the efficacy and safety of JARDIANCE<sup>®</sup>{" "}
                    10 mg (n=1863) were evaluated vs placebo (n=1867). Patients
                    were adults with chronic HF (NYHA class II, III, or IV) and
                    reduced ejection fraction (LVEF ≤40%). The primary endpoint
                    in the EMPEROR-Reduced trial was a composite of CV death or
                    hospitalisation for HF, analysed as time to the first event.
                    Patients treated with JARDIANCE<sup>®</sup> experienced a
                    25% RRR in this endpoint (HR=0.75; 95% CI: 0.65, 0.86;
                    <em>p</em>&lt;0.001).<sup>9</sup>
                  </p>
                  <p>
                    <sup>†</sup>Change from baseline in clinical summary score
                    (HF symptoms and physical limitations domains) of the KCCQ at
                    week 52 was a prespecified secondary endpoint in the
                    EMPEROR-Reduced and EMPEROR-Preserved trials. KCCQ change from
                    baseline to 52 weeks. EMPEROR-Reduced: JARDIANCE<sup>®</sup>{" "}
                    5.8 ± 0.4; placebo 4.1 ± 0.4. EMPEROR-Preserved: JARDIANCE
                    <sup>®</sup> 4.51 ± 0.31, placebo: 3.18 ± 0.31. Patient-reported
                    outcomes measured changes in KCCQ summary scores. JARDIANCE
                    <sup>®</sup> led to significant improvements in mean KCCQ-CSS,
                    -TSS, and -OSS, which were apparent as early as 3 months and were
                    sustained at 8 and 12 months. Patients treated with JARDIANCE
                    <sup>®</sup> were more likely to show clinically meaningful
                    improvements (≥5, ≥10, and ≥15 points) and less likely to
                    experience clinically meaningful deterioration in health status
                    when compared to placebo.<sup>12,13</sup>
                  </p>
                  <p>
                    <sup>‡</sup>In the EMPEROR-Reduced trial, the effect of
                    JARDIANCE<sup>®</sup> to reduce the combined risk of death,
                    hospitalisation for heart failure, or an emergent or urgent
                    heart failure visit was statistically significant at 12 days
                    after randomisation and statistical significance was
                    sustained from day 12 onward (HR=0.70; 95% CI 0.63–0.78;{" "}
                    <em>p</em>&lt;0.0001).<sup>16</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Abbreviations</h3>
                <p className="text-xs">
                  ACE=angiotensin-converting enzyme; ACEi=angiotensin-converting
                  enzyme inhibitor; ARNi= angiotensin receptor-neprilysin
                  inhibitor; bpm=beats per minute; CI=confidence interval;
                  CKD=chronic kidney disease; CSS=Clinical Summary;
                  CV=cardiovascular; CVD=cardiovascular disease; DM=diabetes
                  mellitus; ESC=European Society of Cardiology; eGFR=estimated
                  glomerular filtration rate; GDMT=guideline-directed medical
                  therapy; HF=heart failure; HFrEF=heart failure with reduced
                  ejection fraction; HHF=hospitalization for heart failure;
                  HR=hazard ratio; KCCQ= KCCQ=Kansas City Cardiomyopathy
                  Questionnaire; LV=left ventricular; LVEF=left ventricular
                  ejection fraction; MRA=mineralocorticoid receptor antagonist;
                  NNT=number needed to treat; NT-proBNP=N-terminal pro-brain
                  natriuretic peptide; NYHA=New York Heart Association;
                  OSS=Overall Summary Score; RRR=relative risk reduction;
                  SGLT2i= sodium-glucose cotransporter-2 inhibitor; TSS=Total
                  Symptom Score; T2D=type 2 diabetes; uACR=urine
                  albumin-to-creatinine ratio.
                </p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <ol className="text-xs space-y-1 list-decimal pl-5">
                  <li>
                    Settergren C, Benson L, Shahim A, et al. Cause-specific death
                    in heart failure across the ejection fraction spectrum: A
                    comprehensive assessment of over 100 000 patients in the Swedish
                    Heart Failure Registry. <em>Eur J Heart Fail</em>.
                    2024;26(5):1150-1159.
                  </li>
                  <li>
                    Khan MS, Sreenivasan J, Lateef N, et al. Trends in 30- and
                    90-day readmission rates for heart failure.{" "}
                    <em>Circ Heart Fail</em>. 2021;14(4):e008335.
                  </li>
                  <li>
                    Abdin A, Anker SD, Butler J, et al. 'Time is prognosis' in
                    heart failure: time-to-treatment initiation as a modifiable risk
                    factor. <em>ESC Heart Failure</em>. 2021;8(6):4444-4453.
                  </li>
                  <li>
                    Maddox TM, Januzzi JL, Allen LA, et al. 2024 ACC expert
                    consensus decision pathway for treatment of heart failure with
                    reduced ejection fraction. <em>J Am Coll Cardiol</em>.
                    2024;83(15):1444-1488.
                  </li>
                  <li>
                    McDonagh TA, Metra M, Adamo M, et al. 2021 ESC Guidelines for
                    the diagnosis and treatment of acute and chronic heart failure.
                    <em>Eur Heart J</em>. 2021;42(36):3599-3726.
                  </li>
                  <li>
                    Shen L et al. Accelerated and personalized therapy for heart
                    failure with reduced ejection fraction. <em>Eur Heart J</em>.
                    2022;43:2573.
                  </li>
                  <li>
                    Greene SJ, Adam A, Schmedt N, et al. Contemporary
                    Guideline-Directed Medical Therapy for Heart Failure in the
                    United States: The EMPACE Study. <em>J Am Heart Assoc</em>.
                    2026;15(6):e044785.
                  </li>
                  <li>
                    Heidenreich PA, Bozkurt B, Aguilar D, et al. 2022
                    AHA/ACC/HFSA guideline for the management of heart failure:
                    executive summary. <em>J Am Coll Cardiol</em>.
                    2022;79(17):1757-1780.
                  </li>
                  <li>
                    Packer M, Anker SD, Butler J, et al; EMPEROR-Reduced Trial
                    Investigators. Cardiovascular and renal outcomes with
                    empagliflozin in heart failure. <em>N Engl J Med</em>.
                    2020;383(15):1413-1424. (EMPEROR-Reduced results and the
                    publication's Supplementary Appendix.)
                  </li>
                  <li>
                    Anker SD, Butler J, Filippatos G, et al. Effect of empagliflozin
                    on cardiovascular and renal outcomes in patients with heart
                    failure by baseline diabetes status: Results from the
                    EMPEROR-Reduced trial. <em>Circulation</em>.
                    2021;143(4):337-349.
                  </li>
                  <li>
                    Anker SD, Butler J, Filippatos G, et al; EMPEROR-Preserved Trial
                    Investigators. Empagliflozin in heart failure with a preserved
                    ejection fraction. <em>N Engl J Med</em>.
                    2021;385(16):1451-1461. (EMPEROR-Preserved results and the
                    publication's Supplementary Appendix.)
                  </li>
                  <li>
                    Butler J, Anker SD, Filippatos G, et al; EMPEROR-Reduced Trial
                    Committees and Investigators. Empagliflozin and health-related
                    quality of life outcomes in patients with heart failure with
                    reduced ejection fraction: the EMPEROR-Reduced trial.{" "}
                    <em>Eur Heart J</em>. 2021;42(13):1203-1212.
                  </li>
                  <li>
                    Butler J, Filippatos G, Siddiqi J, et al. Empagliflozin, health
                    status, and quality of life in patients with heart failure and
                    preserved ejection fraction: the EMPEROR-Preserved trial.{" "}
                    <em>Circulation</em>. 2022;145(3):184-193.
                  </li>
                  <li>
                    Bozkurt B, Rossignol P, Vassalotti JA. Albuminuria as a
                    diagnostic criterion and a therapeutic target in heart failure
                    and other cardiovascular disease. <em>Eur J Heart Fail</em>.
                    2025;27(11):2357-2371.
                  </li>
                  <li>
                    Matsushita K, Velde M, Astor B, et al; Chronic Kidney Disease
                    Prognosis Consortium. Association of estimated glomerular
                    filtration rate and albuminuria with all-cause and
                    cardiovascular mortality in general population cohorts: a
                    collaborative meta-analysis. <em>Lancet</em>.
                    2010;375(9371):2073-2081.
                  </li>
                  <li>
                    Packer M, Anker SD, Butler J, et al; EMPEROR-Reduced Trial
                    Committee and Investigators. Effect of empagliflozin on the
                    clinical stability of patients with heart failure and the
                    EMPEROR-Reduced trial. <em>Circulation</em>.
                    2021;143(4):326-336.
                  </li>
                  <li>
                    JARDIANCE<sup>®</sup> [summary of product characteristics].
                    Ingelheim am Rhein, Germany; Boehringer Ingelheim International
                    GmbH; March 2026.
                  </li>
                </ol>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
