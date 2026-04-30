'use client'

import { useState } from 'react'

export default function ReferencesButtonPatient4() {
  const [isOpen, setIsOpen] = useState(false)

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
                <h3 className="text-xl font-semibold mb-4">
                  Safety Information
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Very common AEs:</h4>
                    <p className="mb-2">
                      <strong>Volume depletion:</strong> The frequency was
                      increased in patients aged 75 years and older (JARDIANCE
                      <sup>®</sup>
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
                    treatment of chronic kidney disease.<sup>1</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Footnotes</h3>
                <div className="text-xs space-y-2">
                  <p>
                    <strong>*</strong>In the EMPA-KIDNEY trial, a randomised,
                    parallel-group, double-blind, placebo-controlled study of
                    6609 patients with CKD, the efficacy and safety of JARDIANCE
                    <sup>®</sup> 10 mg (n=3304) were evaluated vs placebo
                    (n=3305). The primary endpoint in the EMPA-KIDNEY trial was
                    a composite of CV death or progression of kidney disease
                    defined as end-stage kidney disease (the initiation of
                    maintenance dialysis or receipt of a kidney transplant), a
                    sustained decrease in the eGFR to &lt;10 ml/min/1.73 m
                    <sup>2</sup>, a sustained decrease in eGFR of ≥40% from
                    baseline, or death from renal causes. Patients treated with
                    JARDIANCE<sup>®</sup> experienced a 28% RRR in this endpoint
                    (HR=0.72; 95% CI: 0.64, 0.82; p&lt;0.001).<sup>6</sup>
                  </p>

                  <p>
                    <strong>†</strong>ARR was estimated as the absolute
                    difference in the proportion of events by treatment arm.
                    NNT: 28 (95% CI: 19, 53) per 2 years at risk.<sup>6</sup>
                  </p>

                  <p>
                    <strong>‡</strong>In a subsidiary analysis of the
                    EMPA-KIDNEY trial, which included a large number of patients
                    with nondiabetic causes of chronic kidney disease at risk of
                    progression, EMPA-KIDNEY showed an absolute difference in
                    annual rate of change in eGFR compared with placebo in
                    diabetic kidney disease (1.65; 95% C: 1.26-2.04), glomerular
                    disease (1.43; 95% CI: 0.99-1.87), and other/unknown (0.95;
                    95% CI: 0.49-1.42).<sup>7</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Abbreviations</h3>
                <p className="text-xs">
                  ACEi=angiotensin-converting enzyme inhibitor; BMI=body mass
                  index; CI=confidence interval; CKD=chronic kidney disease;
                  CV=cardiovascular; CVD=cardiovascular disease; DM=diabetes
                  mellitus; eGFR=estimated glomerular filtration rate;
                  HbA1c=haemoglobin A1c; HF=heart failure; HFpEF=heart failure
                  with preserved ejection fraction; HR=hazard ratio;
                  KDIGO=Kidney Disease: Improving Global Outcomes; NNT=number
                  needed to treat; RRR=relative risk reduction; SGLT2i=
                  sodium-glucose cotransporter-2 inhibitor; T2D=type 2 diabetes;
                  uACR=urine albumin-to-creatinine ratio.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <ol className="text-xs space-y-1 list-decimal pl-5">
                  <li>
                    JARDIANCE<sup>®</sup> [summary of product characteristics].
                    Ingelheim am Rhein, Germany; Boehringer Ingelheim
                    International GmbH; June 2025.
                  </li>
                  <li>
                    Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work
                    Group. KDIGO 2024 Clinical Practice Guideline for the
                    Evaluation and Management of Chronic Kidney Disease. Kidney
                    Int. 2024;105(4S):S117-S314
                  </li>
                  <li>
                    Janse RJ, Fu EL, Dahlström U, et al. Use of
                    guideline-recommended medical therapy in patients with heart
                    failure and chronic kidney disease: from physician's
                    prescriptions to patient's dispensations, medication
                    adherence and persistence. Eur J Heart Fail.
                    2022;24(11):2185-2195.
                  </li>
                  <li>
                    Ma CX, Ma XN, Guan CH, Li YD, Mauricio D, Fu SB.
                    Cardiovascular disease in type 2 diabetes mellitus: progress
                    toward personalized management. Cardiovasc Diabetol.
                    2022;21(74):1-15.
                  </li>
                  <li>
                    Lawson CA, Seidu S, Zaccardi F, McCann G, Kadam UT, Davies
                    MJ, et al. Outcome trends in people with heart failure, type
                    2 diabetes mellitus and chronic kidney disease in the UK
                    over twenty years. E Clinical Medicine. 2021;32:100739.
                  </li>
                  <li>
                    Herrington WG, Staplin N, Wanner C, et al. EMPA-KIDNEY
                    Collaborative Group. Empagliflozin in patients with chronic
                    kidney disease. N Engl J Med. 2023;388(2):117-127.
                    (EMPA-KIDNEY results and the publication's Supplementary
                    Appendix.)
                  </li>
                  <li>
                    EMPA-KIDNEY Collaborative Group. Impact of primary kidney
                    disease on the effects of empagliflozin in patients with
                    chronic kidney disease: secondary analyses of the
                    EMPA-KIDNEY trial. Lancet Diabetes Endocrinol. 2024;12:51-60
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