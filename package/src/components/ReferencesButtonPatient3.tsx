'use client'

// JOANA PATIENT 3 - Step 1, 2, 3

import { useState } from 'react'

export default function ReferencesButtonPatient3() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="z-50 px-10 py-4 text-white bg-[#066368] w-full relative"
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
                    <p>Tubulointerstitial nephritis</p>
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
                    mellitus as an adiunct to diet and exercise
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
                    treatment of chronic kidney disease.<sup>7</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Footnotes</h3>
                <div className="text-xs space-y-2">
                  <p>
                    <sup>′</sup>In the EMPA-REG OUTCOME<sup>®</sup> trial, a
                    randomised, double-blind, placebo-controlled study of 7720
                    patients with T2D at high cardiovascular risk, the efficacy
                    and safety of JARDIANCE<sup>®</sup> 10 mg or 25 mg (n=4867)
                    were evaluated vs placebo (n=2333). Patients were adults
                    with insufficiently controlled T2D and CAD, PAD, or a
                    history of Ml or stroke. The primary composite outcome in
                    the EMPA-REG OUTCOME<sup>®</sup> trial was 3-point MACE,
                    composed of death from CV causes, nonfatal Mi, or nonfatal
                    stroke, as analysed in the pooled JARDIANCE group vs the
                    placebo group. Patients treated with JARDIANCE<sup>®</sup>{" "}
                    experienced a 14% RRR in this endpoint (HR=0.86; 95% Cl:
                    0.74, 0.99; <em>p</em> &lt; 0.001 for noninferiority,{" "}
                    <em>p</em>=0.04 for superiority).<sup>5</sup>
                  </p>

                  <p>
                    <sup>†</sup>CV death was part of the composite primary
                    endpoint, 3-point MACE, in the EMPA REG OUTCOME<sup>®</sup>{" "}
                    trial (HR=0.86; 95% Cl: 0.74, 0.99; <em>p</em>&lt;0.001 for
                    noninferiority, <em>p</em>=0.04 for superiority) and 38% RRR
                    in CV death was achieved in the overall EMPA-REG OUTCOME
                    <sup>®</sup> population for the duration of the trial
                    (HR=0.62; 95% Cl: 0.49, 0.77; <em>p</em>&lt;0.001). There
                    were no significant differences between the placebo and
                    JARDIANCE groups of nonfatal MI (HR=0.87; 95% Cl: 0.70,
                    1.09; <em>p</em>=0.22) or nonfatal stroke (HR=1.24; 95% Cl:
                    0.92, 1.67; <em>p</em>=0.16).<sup>5</sup>
                  </p>

                  <p>
                    <sup>‡</sup>* In addition to reducing the risk of CV death
                    when added to the standard of care, JARDIANCE<sup>®</sup>{" "}
                    also lowered HbA1c. In addition, JARDIANCE<sup>®</sup>{" "}
                    demonstrated reduction in weight and blood pressure.
                    JARDIANCE<sup>®</sup> is not indicated for weight loss or
                    reduction of blood pressure.<sup>5</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Abbreviations</h3>
                <p className="text-xs">
                  ARR=absolute risk reduction; ASCVDOatherosclerotic
                  cardiovascular disease; BMI=body mass index; CAD=coronary
                  artery disease; Cl=confidence interval; CKD=chronic kidney
                  disease; CV=cardiovascular; CVD=cardiovascular disease;
                  eCVD=established cardiovascular disease; eGFR=estimated
                  glomerular filtration rate; ESC?European Society of
                  Cardiology; HbA1c=haemoglobin A1c; HF=heart failure;
                  HFmrEF=heart failure with mildly reduced ejection fraction;
                  HFpEF=heart failure with preserved ejection fraction;
                  HFrEF=heart failure with reduced ejection fraction;
                  HHF=hospitalization for heart failure; HR=hazard ratio;
                  LVEF=left ventricular ejection fraction; MACE=major adverse
                  cardiovascular events; Mi=myocardial infarction; NNT=number
                  needed to treat; NT-proBNP=N-terminal pro-brain natriuretic
                  peptide; NYHA=New York Heart Association; PAD=peripheral
                  artery disease; RRR=relative risk reduction;
                  SGLT2i=sodium-glucose cotransporter-2 inhibitor; T2D=type 2
                  diabetes; ACR=urine albumin-to-creatinine ratio.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <ol className="text-xs space-y-1 list-decimal pl-5">
                  <li>
                    Marx N, Federici M, Schatt K, et al. 2023 ESC Guidelines for
                    the management of cardiovascular disease in patients with
                    diabetes. Eur Heart J.2023:44(39):4043-4140
                  </li>
                  <li>
                    Ma CX, Ma XN, Guan CH, Li YD, Mauricio D, Fu SB.
                    Cardiovascular disease in type 2 diabetes mellitus: progress
                    toward personalized management. Cardiovasc Diabetol.
                    2022;21(74):1-15.
                  </li>
                  <li>
                    Thomas, M. C., Cooper, M. E. & Zimmet, P. Changing
                    epidemiology of type 2 diabetes mellitus and associated
                    chronic kidney disease. Nat. Rev. Nephrol. 2016; 12, 73-81
                  </li>
                  <li>
                    Lawson CA, Seidu S, Zaccardi F, McCann G, Kadam UT, Davies
                    MJ, et al. Outcome trends in people with heart failure, type
                    2 diabetes mellitus and chronic kidney disease in the UK
                    over twenty years. E Clinical Medicine. 2021;32:100739.
                  </li>
                  <li>
                    Zinman B, Wanner C, Lachin JM, et al; EMPA-REG OUTCOME
                    Investigators. Empagliflozin, cardiovascular outcomes, and
                    mortality in type 2 diabetes. N EnglJ Med.
                    2015;373(22):2117-2128. (EMPA-REG OUTCOME<sup>®</sup>{" "}
                    results and the publications Supplementary Appendix.)
                  </li>
                  <li>
                    Verma S, Leiter LA, Sharma A, et al. How early after
                    treatment initiation are the CV benefits of empagliflozin
                    apparent? A post hoc analysis of EMPA-REG- OUTCOME.
                    Diabetes. 2020;69(suppl 1):28-OR
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