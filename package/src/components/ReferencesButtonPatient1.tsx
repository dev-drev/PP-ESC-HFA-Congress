"use client";

// LINDA PATIENT 1 - Step 1, 2, 3

import { useState } from "react";

export default function ReferencesButtonPatient1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 px-10 py-4 text-white bg-[#066368] w-full relative text-center"
      >
        References
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl overflow-hidden w-full overflow-y-auto max-h-[calc(100vh-300px)]">
            <div className="px-6 py-6 text-black">
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
                    treatment of chronic kidney disease.<sup>9</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Footnotes</h3>

                <div className="text-xs space-y-3">
                  <p>
                    <sup>*</sup>
                    In the EMPEROR-Preserved trial, a randomised, double-blind,
                    parallel-group, placebo-controlled study of 5988 patients
                    with HFpEF, the efficacy and safety of JARDIANCE<sup>
                      ®
                    </sup>{" "}
                    10 mg (n=2997) were evaluated vs placebo (n=2991). Patients
                    were adults with chronic HF (NYHA class II, III, or IV) and
                    preserved ejection fraction (LVEF &gt;40%). The primary
                    endpoint in the EMPEROR-Preserved trial was a composite of
                    CV death or hospitalisation for HF, analysed as time to
                    first event. Patients treated with JARDIANCE<sup>®</sup>{" "}
                    experienced a 21% RRR in this endpoint (HR=0.79; 95% CI
                    0.69, 0.90; <em>p</em>&lt;0.001).<sup>5</sup>
                  </p>

                  <p>
                    <sup>†</sup>
                    Change from baseline in clinical summary score (HF symptoms
                    and physical limitations domains) of the KCCQ at week 52 was
                    a prespecified secondary endpoint in the EMPEROR-Reduced and
                    EMPEROR-Preserved trials. KCCQ change from baseline to 52
                    weeks. EMPEROR-Reduced: JARDIANCE<sup>®</sup> 5.8 ± 0.4;
                    placebo 4.1 ± 0.4. EMPEROR-Preserved: JARDIANCE<sup>®</sup>{" "}
                    4.51 ± 0.31; placebo 3.18 ± 0.31. Patient-reported outcomes
                    measured changes in KCCQ summary scores. JARDIANCE
                    <sup>®</sup> led to significant improvements in mean
                    KCCQ-CSS, -TSS, and -OSS, which were apparent as early as 3
                    months and were sustained at 8 and 12 months. Patients
                    treated with JARDIANCE<sup>®</sup> were more likely to show
                    clinically meaningful improvements (≥5, ≥10, and ≥15 points)
                    and less likely to experience clinically meaningful
                    deterioration in health status when compared to placebo.
                    <sup>6,7</sup>
                  </p>

                  <p>
                    <sup>‡</sup>
                    In the EMPEROR-Preserved trial, the effect of JARDIANCE
                    <sup>®</sup> on time to cardiovascular death or heart
                    failure hospitalization was statistically significant at 18
                    days after randomisation and statistical significance was
                    sustained from day 18 onward (HR=0.41, 95% CI 0.17–0.99;{" "}
                    <em>p</em>=0.0476).<sup>8</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Abbreviations</h3>
                <p className="text-xs">
                  ACE=angiotensin-converting enzyme; ACEi=angiotensin-converting
                  enzyme inhibitor; ARNi=angiotensin receptor-neprilysin
                  inhibitor; bpm=beats per minute; CI=confidence interval;
                  CKD=chronic kidney disease; CSS=Clinical Summary Score;
                  CV=cardiovascular; CVD=cardiovascular disease; DM=diabetes
                  mellitus; ESC=European Society of Cardiology; eGFR=estimated
                  glomerular filtration rate; GDMT=guideline-directed medical
                  therapy; HF=heart failure; HFmrEF=heart failure with mildly
                  reduced ejection fraction; HFpEF=heart failure with preserved
                  ejection fraction; HFrEF=heart failure with reduced ejection
                  fraction; HHF=hospitalisation for heart failure; HR=hazard
                  ratio; KCCQ=Kansas City Cardiomyopathy Questionnaire; LV=left
                  ventricular; LVEF=left ventricular ejection fraction;
                  MRA=mineralocorticoid receptor antagonist; NNT=number needed
                  to treat; NT-proBNP=N-terminal pro-brain natriuretic peptide;
                  NYHA=New York Heart Association; OSS=Overall Summary Score;
                  RRR=relative risk reduction; SGLT2i=sodium-glucose
                  cotransporter-2 inhibitor; TSS=Total Symptom Score; T2D=type 2
                  diabetes; uACR=urine albumin-to-creatinine ratio.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <ol className="text-xs space-y-1 list-decimal pl-5">
                  <li>
                    McDonagh TA, Metra M, Adamo M, et al. 2023 Focused Update of
                    the 2021 ESC Guidelines for the diagnosis and treatment of
                    acute and chronic heart failure. <em>Eur Heart J</em>.
                    2023;44(37):3627–3639.
                  </li>
                  <li>
                    Janse RJ, Fu EL, Dahlström U, et al. Use of
                    guideline-recommended medical therapy in patients with heart
                    failure and chronic kidney disease: from physician’s
                    prescriptions to patient’s dispensations, medication
                    adherence and persistence. <em>Eur J Heart Fail</em>.
                    2022;24(11):2185–2195.
                  </li>
                  <li>
                    Ma CX, Ma XN, Guan CH, Li YD, Mauricio D, Fu SB.
                    Cardiovascular disease in type 2 diabetes mellitus: progress
                    toward personalized management. <em>Cardiovasc Diabetol</em>
                    . 2022;21(74):1–15.
                  </li>
                  <li>
                    Lawson CA, Seidu S, Zaccardi F, McCann G, Kadam UT, Davies
                    MJ, et al. Outcome trends in people with heart failure, type
                    2 diabetes mellitus and chronic kidney disease in the UK
                    over twenty years. <em>E Clinical Medicine</em>.
                    2021;32:100739.
                  </li>
                  <li>
                    Anker SD, Butler J, Filippatos G, et al; EMPEROR-Preserved
                    Trial Investigators. Empagliflozin in heart failure with a
                    preserved ejection fraction. <em>N Engl J Med</em>.
                    2021;385(16):1451–1461. (EMPEROR-Preserved results and the
                    publication’s Supplementary Appendix.)
                  </li>
                  <li>
                    Butler J, Anker SD, Filippatos G, et al; EMPEROR-Reduced
                    Trial Committees and Investigators. Empagliflozin and
                    health-related quality of life outcomes in patients with
                    heart failure with reduced ejection fraction: the
                    EMPEROR-Reduced trial. <em>Eur Heart J</em>.
                    2021;42(13):1203–1212.
                  </li>
                  <li>
                    Butler J, Filippatos G, Siddiqi J, et al. Empagliflozin,
                    health status, and quality of life in patients with heart
                    failure and preserved ejection fraction: the
                    EMPEROR-Preserved trial. <em>Circulation</em>.
                    2022;145(3):184–193.
                  </li>
                  <li>
                    Butler J, Siddiqi TJ, Filippatos G, et al. Early benefit
                    with empagliflozin in heart failure with preserved ejection
                    fraction: insights from the EMPEROR-Preserved Trial.{" "}
                    <em>Eur J Heart Fail</em>. 2022;24(2):245–248.
                  </li>
                  <li>
                    JARDIANCE<sup>®</sup> [summary of product characteristics].
                    Ingelheim am Rhein, Germany; Boehringer Ingelheim
                    International GmbH; June 2025.
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
