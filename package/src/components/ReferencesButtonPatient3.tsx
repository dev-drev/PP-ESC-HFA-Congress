'use client'

// JOANA PATIENT 3 - Step 1, 2, 3

import { useState } from 'react'

export default function ReferencesButtonPatient3() {
  const [isOpen, setIsOpen] = useState(false)

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

          <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl overflow-hidden w-full overflow-y-auto max-h-[calc(100vh-300px)]">
            <div className="px-6 py-6 text-black">
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Safety Information
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Very common AEs<sup>10</sup>:</h4>
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
                    treatment of chronic kidney disease<sup>10</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Footnotes</h3>
                <div className="text-xs space-y-2">
                  <p>
                    <sup>*</sup>In the EMPA-REG OUTCOME<sup>®</sup> trial, a
                    randomised, double-blind, placebo-controlled study of 7020
                    patients with T2D at high cardiovascular risk, the efficacy
                    and safety of JARDIANCE<sup>®</sup> 10 mg or 25 mg (n=4687)
                    were evaluated vs placebo (n=2333). Patients were adults with
                    insufficiently controlled T2D and CAD, PAD, or a history of MI
                    or stroke. The primary composite outcome in the EMPA-REG
                    OUTCOME<sup>®</sup> trial was 3-point MACE, composed of death
                    from CV causes, nonfatal MI, or nonfatal stroke, as analysed in
                    the pooled JARDIANCE<sup>®</sup> group vs the placebo group.
                    The result was 14% RRR (1.6% ARR) in 3-point MACE (HR=0.86; 95%
                    CI: 0.74, 0.99; p&lt;0.001 for noninferiority; p=0.04 for
                    superiority). The 14% RRR in 3-point MACE was driven by a
                    reduction in the risk of CV death (HR=0.62; 95% CI: 0.49, 0.77;
                    p&lt;0.001); there was no change in risk of nonfatal MI
                    (HR=0.87; 95% CI: 0.70, 1.09; p=0.22) or nonfatal stroke
                    (HR=1.24; 95% CI: 0.92, 1.67; p=0.16).<sup>8</sup>
                  </p>
                  <p>
                    <sup>†</sup>In addition to reducing the risk of CV death when
                    added to the standard of care, JARDIANCE<sup>®</sup> also
                    lowered HbA1c. In addition, JARDIANCE<sup>®</sup> demonstrated
                    reduction in weight and blood pressure. JARDIANCE<sup>®</sup>{" "}
                    is not indicated for weight loss or reduction of blood pressure.<sup>8</sup>
                  </p>
                  <p>
                    <sup>‡</sup>The benefit of empagliflozin on CV death was first
                    statistically significant at Day 59 (HR [95% CI], 0.28 [0.08, 0.96],
                    p = 0.0424) and was largely sustained during follow up.<sup>9</sup>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Abbreviations</h3>
                <p className="text-xs">
                  ARR=absolute risk reduction; ASCVD=atherosclerotic
                  cardiovascular disease; BMI=body mass index; CAD=coronary
                  artery disease; CI=confidence interval; CKD=chronic kidney
                  disease; CV=cardiovascular; CVD=cardiovascular disease;
                  eCVD=established cardiovascular disease; eGFR=estimated
                  glomerular filtration rate; ESC=European Society of
                  Cardiology; HbA1c=haemoglobin A1c; HF=heart failure;
                  HFmrEF=heart failure with mildly reduced ejection fraction;
                  HFpEF=heart failure with preserved ejection fraction;
                  HFrEF=heart failure with reduced ejection fraction;
                  HHF=hospitalization for heart failure; HR=hazard ratio;
                  LVEF=left ventricular ejection fraction; MACE=major adverse
                  cardiovascular events; MI=myocardial infarction; NNT=number
                  needed to treat; NT-proBNP=N-terminal pro-brain natriuretic
                  peptide; NYHA=New York Heart Association; PAD=peripheral
                  artery disease; RRR=relative risk reduction;
                  SGLT2i=sodium-glucose cotransporter-2 inhibitor; T2D=type 2
                  diabetes; uACR=urine albumin-to-creatinine ratio.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">References</h3>
                <ol className="text-xs space-y-1 list-decimal pl-5">
                  <li>
                    Raghavan S, Vassy JL, Ho YL, et al. Diabetes
                    Mellitus-Related All-Cause and Cardiovascular Mortality in
                    a National Cohort of Adults. <em>J Am Heart Assoc</em>.
                    2019;8(4):e011295.
                  </li>
                  <li>
                    Coles B, Zaccardi F, Hvid C, Davies MJ, Khunti K.
                    Cardiovascular events and mortality in people with type 2
                    diabetes and multimorbidity: A real-world study of patients
                    followed for up to 19 years. <em>Diabetes Obes Metab</em>.
                    2021;23(1):218-227.
                  </li>
                  <li>
                    Marx N, Federici M, Schütt K, et al. 2023 ESC Guidelines
                    for the management of cardiovascular disease in patients
                    with diabetes. <em>Eur Heart J</em>. 2023;44(39):4043-4140.
                  </li>
                  <li>
                    GBD Chronic Kidney Disease Collaboration. Global, regional,
                    and national burden of chronic kidney disease, 1990-2017:
                    a systematic analysis for the Global Burden of Disease
                    Study 2017. <em>Lancet</em>. 2020;395(10225):709-733.
                  </li>
                  <li>
                    Davies MJ, Aroda VR, Collins BS, et al. Management of
                    hyperglycemia in type 2 diabetes, 2022: a consensus report
                    by the American Diabetes Association (ADA) and the European
                    Association for the Study of Diabetes (EASD).
                    <em> Diabetes Care</em>. 2022;45(11):2753-2786.
                  </li>
                  <li>
                    Bozkurt B, Rossignol P, Vassalotti JA. Albuminuria as a
                    diagnostic criterion and a therapeutic target in heart
                    failure and other cardiovascular disease.
                    <em> Eur J Heart Fail</em>. 2025;27(11):2357-2371
                  </li>
                  <li>
                    Matsushita K, Velde M, Astor B, et al; Chronic Kidney
                    Disease Prognosis Consortium. Association of estimated
                    glomerular filtration rate and albuminuria with all-cause
                    and cardiovascular mortality in general population cohorts:
                    a collaborative meta-analysis. <em>Lancet</em>.
                    2010;375(9371):2073-2081.
                  </li>
                  <li>
                    Zinman B, Wanner C, Lachin JM, et al; EMPA-REG OUTCOME
                    Investigators. Empagliflozin, cardiovascular outcomes, and
                    mortality in type 2 diabetes. <em>N Engl J Med</em>.
                    2015;373(22):2117-2128. (EMPA-REG OUTCOME<sup>®</sup>{" "}
                    results and the publications Supplementary Appendix.)
                  </li>
                  <li>
                    Verma S, Leiter LA, Sharma A, et al. How early after
                    treatment initiation are the CV benefits of empagliflozin
                    apparent? A post hoc analysis of EMPA-REG- OUTCOME.
                    <em> Diabetes</em>. 2020;69(suppl 1):28-OR
                  </li>
                  <li>
                    JARDIANCE<sup>®</sup> [summary of product characteristics].
                    Ingelheim am Rhein, Germany; Boehringer Ingelheim
                    International GmbH; March 2026.
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