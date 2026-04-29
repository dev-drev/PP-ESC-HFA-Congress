export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  nyhaClass: string;
  /** Optional ethnicity id for character assets (e.g. "ethnicity1"). Resolved from market config. */
  ethnicity?: string;
  imageSrc?: string;
  avatarSrc?: string;
  overlaySrc?: string;
  backgroundSrc?: string;
  stepImageSrc?: string;
  quote?: string;
  treatments: Treatment[];
  comorbidities: string[];
  metrics: PatientMetrics;
  medicalConsiderations?: string;
  currentTreatment?: string;
  historyAndComorbidities?: string;
  futureStates: {
    [key: string]: PatientFutureState;
  };
  proceededStates?: {
    [key: string]: {
      quote?: string;
    };
  };
}

export interface PatientFutureState {
  year: number;
  metrics: PatientMetrics;
  nyhaClass: string;
  hasProgressed?: boolean;
  treatments: Treatment[];
  imageSrc?: string;
  overlaySrc?: string;
  backgroundSrc?: string;
  stepImageSrc?: string;
  age?: number;
  quote?: string;
  medicalConsiderations?: string;
  currentTreatment?: string;
  historyAndComorbidities?: string;
}

export interface Treatment {
  id: string;
  name: string;
}

export interface PatientMetrics {
  bloodPressure: string;
  heartRate?: number;
  lvef: number | string;
  ntProBNP: number;
  egfr: number;
  uacr: string;
  echocardiography: string;
  bmi?: number;
  hba1c?: number;
  ecg?: string;
  echo?: string;
}

export const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Linda",
    age: 67,
    condition: "HFpEF",
    nyhaClass: "NYHA Class II",
    imageSrc: "/characters/01.png",
    avatarSrc: "/avatars/linda.png",
    overlaySrc: "/overlays/01.png",
    stepImageSrc: "/next-steps/linda/final/step1.png",
    quote:
      "Heart Failure? What does this mean? Is this the reason for my shortness of breath?",
    medicalConsiderations: `HFpEF (NYHA Class II)
`,
    currentTreatment: `ACEi 
Statin
Loop diuretic
Lifestyle modifications`,
    historyAndComorbidities: `Hypertension, dyslipidemia, overweight
`,
    treatments: [
      { id: "t1", name: "ACEi" },
      { id: "t2", name: "Statin, Loop diuretic, SGLT2i" },
      { id: "t3", name: "Lifestyle modifications" },
    ],
    comorbidities: ["Hypertension", "dyslipidemia", "overweight"],
    metrics: {
      bloodPressure: "142/92",
      heartRate: 72,
      lvef: 62,
      ntProBNP: 325,
      egfr: 70,
      uacr: "not tested",
      echocardiography:
        "Severe left atrial enlargement, LV hypertrophy, pulmonary hypertension",
    },
    futureStates: {
      monitoring_ecg: {
        year: 2030,
        nyhaClass: "NYHA Class II",
        metrics: {
          bloodPressure: "140/88",
          heartRate: 80,
          lvef: 58,
          ntProBNP: 575,
          egfr: 50,
          uacr: "not tested",
          echocardiography:
            "Severe left atrial dilatation, pulmonary hypertension",
        },
        imageSrc: "/characters/01A.png",
        overlaySrc: "/overlays/01A.png",
        age: 72,
        quote:
          "Even daily tasks are very challenging for me - I feel so tired and my legs are swollen.",
        medicalConsiderations: `Diagnosed with HFpEF (NYHA Class II) 5 years ago, now progressed to NYHA Class III`,
        currentTreatment: `ACEi
Statin
Loop diuretic
Lifestyle modifications`,
        historyAndComorbidities: `Hypertension, dyslipidemia, overweight`,
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin" },
          { id: "t3", name: "Loop diuretic (dose reduced)" },
          { id: "t4", name: "SGLT2i (since 5 years)" },
          { id: "t5", name: "Lifestyle modifications" },
        ],
      },
      prescribe_sglt2i: {
        year: 2030,
        nyhaClass: "NYHA Class III",
        hasProgressed: true,
        metrics: {
          bloodPressure: "138/86",
          heartRate: 70,
          lvef: 60,
          ntProBNP: 277,
          egfr: 63,
          uacr: "not tested",
          echocardiography: "Moderate left atrial enlargement, LV hypertrophy",
        },
        imageSrc: "/characters/01B.png",
        overlaySrc: "/overlays/01B.png",
        backgroundSrc: "/backgrounds/01A.jpg",
        age: 72,
        quote:
          "I can manage my daily life, despite being tired and breathless sometimes.",
        medicalConsiderations: `HFpEF (NYHA Class II), diagnosed 5 years ago`,
        currentTreatment: `ACEi
Statin
Loop diuretic (dose reduced)
SGLT2i (since 5 years)
Lifestyle modifications`,
        historyAndComorbidities: `Hypertension, dyslipidemia, overweight`,
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin" },
          { id: "t3", name: "Loop diuretic" },
          { id: "t5", name: "Lifestyle modifications" },
        ],
      },
    },
    proceededStates: {
      prescribe_sglt2i: {
        quote:
          "I’m grateful that I can still meet my friends and that my doctor takes care of my heart failure.",
      },
    },
  },
  {
    id: "2",
    name: "Robert",
    age: 62,
    condition: "HFrEF",
    nyhaClass: "NYHA Class II",
    imageSrc: "/Card-Man_A_20241028.png",
    overlaySrc: "/overlays/02.png",
    avatarSrc: "/avatars/robert.png",
    stepImageSrc: "/next-steps/robert/final/step2.png",
    quote:
      "Heart Failure? What does this mean? Is this the reason for my shortness of breath?",
    medicalConsiderations: `Recently diagnosed with 
HFrEF  (NYHA Class II)`,
    currentTreatment: `ACEi 
Beta-blocker
Statin`,
    historyAndComorbidities: `Hypertension, dyslipidemia, history of smoking`,
    treatments: [
      { id: "t1", name: "Beta-blocker" },
      { id: "t2", name: "ACEi" },
      { id: "t3", name: "MRA" },
    ],
    comorbidities: ["Coronary artery disease", "Diabetes", "CKD"],
    metrics: {
      bloodPressure: "140/85",
      heartRate: 75,
      lvef: 36,
      ntProBNP: 824,
      egfr: 67,
      uacr: "not tested",
      echocardiography:
        "Mild left ventricular dilatation, no significant valvular disease, reduced LVEF",
    },
    futureStates: {
      monitoring_ecg: {
        year: 2030,
        nyhaClass: "NYHA Class III",
        hasProgressed: true,
        metrics: {
          bloodPressure: "135/80",
          heartRate: 85,
          lvef: 34,
          ntProBNP: 1528,
          egfr: 50,
          uacr: "not tested",
          echocardiography:
            "Moderate left ventricular dilatation, secondary mitral  regurgitation, reduced LVEF",
        },
        imageSrc: "/characters/02B.png",
        stepImageSrc: "/next-steps/robert/final/step3b.png",
        overlaySrc: "/overlays/02A.png",
        age: 67,
        quote:
          "Small tasks such as getting dressed or walking across the room now feel overwhelmingly difficult and leave me out of breath.",
        medicalConsiderations: `Diagnosed with HFrEF (NYHA Class II) 5 years ago, progressed to NYHA Class III`,
        currentTreatment: `ACEi
Beta-blocker
Statin
Loop diuretic as needed`,
        historyAndComorbidities: `Hypertension, dyslipidemia, history of smoking`,
        treatments: [
          { id: "t1", name: "Beta-blocker" },
          { id: "t2", name: "ACEi" },
          { id: "t3", name: "MRA" },
          { id: "t4", name: "Increased diuretic dose" },
        ],
      },
      continue_acei_10years: {
        year: 2035,
        nyhaClass: "NYHA Class IV",
        hasProgressed: true,
        metrics: {
          bloodPressure: "125/70",
          heartRate: 95,
          lvef: 28,
          ntProBNP: 2586,
          egfr: 20,
          uacr: "915",
          echocardiography:
            "Moderate left ventricular dilatation, moderate secondary mitral regurgitation; LVEF worsened, moderate pulmonary hypertension",
        },
        age: 72,
        quote:
          "Recently, I was hospitalized again due to acute decompensated HF. Can you help me feel better, doctor?",
        medicalConsiderations: `HFrEF (NYHA Class IV), diagnosed 10 years ago, CKD Stage 4 (G4A3), history of MI`,
        currentTreatment: `ACEi
Beta-blocker
Statin
Loop diuretic as needed`,
        historyAndComorbidities: `Hypertension, dyslipidemia, history of smoking`,
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Beta-blocker" },
          { id: "t3", name: "Statin" },
          { id: "t4", name: "Loop diuretic as needed" },
        ],
      },
      prescribe_sglt2i: {
        year: 2030,
        nyhaClass: "NYHA Class II",
        metrics: {
          bloodPressure: "120/75",
          heartRate: 70,
          lvef: 40,
          ntProBNP: 717,
          egfr: 64,
          uacr: "not tested",
          echocardiography:
            "No left ventricular dilatation,  no significant valvular disease, LVEF improved",
        },
        imageSrc: "/characters/02A.png",
        overlaySrc: "/overlays/02A.png",
        stepImageSrc: "/next-steps/robert/final/step3.png",
        backgroundSrc: "/backgrounds/02A.jpg",
        age: 67,
        quote:
          "I can manage my daily life, despite being tired and breathless sometimes.",
        medicalConsiderations: `Diagnosed with HFrEF (NYHA Class II) 5 years ago`,
        currentTreatment: `Statin
Beta-blocker
SGLT2i
ARNi
MRA
Loop diuretic (as needed)`,
        historyAndComorbidities: `Hypertension, dyslipidemia, history of smoking`,
        treatments: [
          { id: "t1", name: "Beta-blocker" },
          { id: "t2", name: "ACEi" },
          { id: "t3", name: "MRA" },
          { id: "t4", name: "SGLT2i" },
        ],
      },
    },
    proceededStates: {
      prescribe_sglt2i: {
        age: 72,
        quote:
          "This SGLT2i medication has been life-changing. I can enjoy my daily activities again and my heart function has improved!",
      },
    },
  },
  {
    id: "3",
    name: "Joana",
    age: 57,
    condition: "T2D+CAD",
    nyhaClass: "",
    imageSrc: "/characters/03B.png",
    avatarSrc: "/avatars/characters/03B.png",
    overlaySrc: "/overlays/03B.png",
    stepImageSrc: "/next-steps/joana/final/step1.png",
    quote:
      "I came in for a routine heart check because of my diabetes — I honestly didn't expect to be told I have a heart issue.",
    medicalConsiderations: "CAD, T2D",
    currentTreatment: `ACEi
Statin
Metformin
Lifestyle modifications`,
    historyAndComorbidities: "Hypertension, hypercholesterolemia, overweight",
    treatments: [
      { id: "t1", name: "ACEi" },
      { id: "t2", name: "Statin" },
      { id: "t3", name: "Metformin" },
      { id: "t4", name: "Lifestyle modifications" },
    ],
    comorbidities: [
      "Hypertension",
      "Hypercholesterolemia",
      "Overweight",
      "CAD",
      "T2D",
    ],
    metrics: {
      bloodPressure: "134/84",
      lvef: "not ordered",
      ntProBNP: 80,
      egfr: 78,
      uacr: "not tested",
      echocardiography: "Sinus rhythm, no acute ischemic changes",
      bmi: 27.8,
      hba1c: 8.0,
      ecg: "Sinus rhythm, no acute ischemic changes",
      echo: "not ordered",
    },
    futureStates: {
      optimize_antihypertensive: {
        year: 2030,
        nyhaClass: "NYHA Class II",
        metrics: {
          bloodPressure: "132/82",
          heartRate: 72,
          lvef: 60,
          ntProBNP: 320,
          egfr: 63,
          uacr: "200",
          echocardiography: "Sinus rhythm, no new abnormalities",
          bmi: 27.6,
          hba1c: 8.0,
          ecg: "Sinus rhythm, no acute ischemic changes, non-specific ST/T wave changes",
          echo: "Moderate left atrial enlargement, mild LVH, mild pulmonary hypertension",
        },
        imageSrc: "/characters/03C.png",
        overlaySrc: "/overlays/03C.png",
        stepImageSrc: "/next-steps/joana/final/step2.png",
        age: 62,
        quote:
          "Lately, I’ve been feeling more tired, and sometimes even simple tasks leave me out of breath",
        medicalConsiderations: "HFpEF (NYHA Class II), CKD Stage 2 (G2A2)",
        currentTreatment: `ACEi
Statin
Metformin
Lifestyle Modifications`,
        historyAndComorbidities:
          "Hypertension, hypercholesterolemia, overweight, CAD, T2D",
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin" },
          { id: "t3", name: "SGLT2i" },
          { id: "t4", name: "Lifestyle modifications" },
        ],
      },
      monitoring_ecg: {
        year: 2030,
        nyhaClass: "NYHA Class II",
        metrics: {
          bloodPressure: "128/80",
          heartRate: 72,
          lvef: 27.1,
          ntProBNP: 245,
          egfr: 72,
          uacr: "120",
          echocardiography:
            "Sinus rhythm, no acute ischemic changes, non-specific ST/T wave changes",
        },
        imageSrc: "/characters/03A.png",
        overlaySrc: "/overlays/03A.png",
        stepImageSrc: "/next-steps/joana/final/step2.png",
        age: 62,
        quote:
          "I feel okay, but now my doctor says my kidneys need monitoring too — even though I haven't noticed any changes.",
        medicalConsiderations: "HFpEF (NYHA Class II), CKD Stage 2 (G2A2)",
        currentTreatment: `ACEi
Statin
SGLT2i
Lifestyle modifications`,
        historyAndComorbidities:
          "Hypertension, hypercholesterolemia, overweight, CAD, T2D",
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin" },
          { id: "t3", name: "SGLT2i" },
          { id: "t4", name: "Lifestyle modifications" },
        ],
      },
      prescribe_sglt2i: {
        year: 2030,
        nyhaClass: "",
        metrics: {
          bloodPressure: "128/80",
          heartRate: 72,
          lvef: 60,
          ntProBNP: 245,
          egfr: 72,
          uacr: "120",
          echocardiography:
            "Sinus rhythm, no acute ischemic changes, non-specific ST/T wave changes",
          bmi: 27.1,
          hba1c: 7.1,
          ecg: "Sinus rhythm, no acute ischemic changes, non-specific ST/T wave changes",
          echo: "Mild left atrial enlargement, mild LVH",
        },
        imageSrc: "/characters/03C.png",
        overlaySrc: "/overlays/03C.png",
        backgroundSrc: "/backgrounds/03A.jpg",
        stepImageSrc: "/next-steps/joana/final/step3.png",
        age: 62,
        quote:
          "I feel okay, but now my doctor says my kidneys need monitoring too — even though I haven’t noticed any changes.",
        medicalConsiderations: "HFpEF (NYHA Class II), CKD Stage 2 (G2A2)",
        currentTreatment: `ACEi
Statin
SGLT2i
Lifestyle modifications`,
        historyAndComorbidities:
          "Hypertension, hypercholesterolemia, overweight, CAD, T2D",
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin" },
          { id: "t3", name: "SGLT2i" },
          { id: "t4", name: "Lifestyle modifications" },
        ],
      },
    },
    proceededStates: {
      prescribe_sglt2i: {
        quote:
          "I'm glad my doctor caught this early and that the medication is protecting both my heart and kidneys.",
      },
    },
  },
  {
    id: "4",
    name: "James",
    age: 55,
    condition: "CKD",
    nyhaClass: "",
    imageSrc: "/characters/04.png",
    avatarSrc: "/avatars/james.png",
    overlaySrc: "/overlays/04.png",
    stepImageSrc: "/next-steps/james/step6.png",
    quote: "Doctor, except for some occasional headaches, I feel normal.",
    medicalConsiderations: "Diagnosed with hypertension 3 years ago",
    currentTreatment: `ACEi
Statin (low-intensity)
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
    historyAndComorbidities: "Hypercholesterolemia, overweight",
    treatments: [
      { id: "t1", name: "ACEi" },
      { id: "t2", name: "Statin (low-intensity)" },
      { id: "t3", name: "Lifestyle changes" },
    ],
    comorbidities: ["Hypercholesterolemia", "Overweight", "Hypertension"],
    metrics: {
      bloodPressure: "150/96",
      egfr: 68,
      uacr: "204",
      echocardiography: "not ordered",
      bmi: 26,
      hba1c: 5.6,
    },
    futureStates: {
      flow1_sglt2i_at_60: {
        year: 2030,
        nyhaClass: "",
        metrics: {
          bloodPressure: "138/86",
          egfr: 63,
          uacr: "202",
          echocardiography: "not ordered",
          bmi: 25,
          hba1c: 5.5,
        },
        imageSrc: "/characters/04A.png",
        overlaySrc: "/overlays/04A.png",
        age: 60,
        quote:
          "So far, my CKD hasn't really affected my day-to-day life – and my blood pressure seems under control too.",
        medicalConsiderations: "Diagnosed with CKD 5 years ago (CKD G2A2)",
        currentTreatment: `ACEi
Statin (low intensity), SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/james/step2.png",
        treatments: [
          { id: "t1", name: "ACEi" },
          { id: "t2", name: "Statin (low intensity)" },
          { id: "t3", name: "SGLT2i" },
          { id: "t4", name: "Lifestyle changes" },
        ],
      },
      flow1_sglt2i_at_70: {
        year: 2040,
        nyhaClass: "",
        metrics: {
          bloodPressure: "132/80",
          egfr: 58,
          uacr: "210",
          echocardiography: "not ordered",
          bmi: 24.5,
          hba1c: 5.4,
        },
        age: 70,
        quote:
          "My kidney function's not what it was, but I've managed to avoid any serious setbacks.",
        medicalConsiderations: "CKD Stage 3a (G3aA2)",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (low intensity), SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (low intensity)" },
          { id: "t3", name: "SGLT2i" },
          { id: "t4", name: "Lifestyle changes" },
        ],
      },
      flow2_no_sglt2i_at_60: {
        year: 2030,
        nyhaClass: "",
        hasProgressed: true,
        metrics: {
          bloodPressure: "140/92",
          egfr: 53,
          uacr: "250",
          echocardiography: "not ordered",
          bmi: 25.7,
          hba1c: 5.6,
        },
        imageSrc: "/characters/04B.png",
        overlaySrc: "/overlays/04B.png",
        age: 60,
        quote:
          "I've been more tired than usual lately. I didn't think much of it as I thought it was just part of getting older.",
        medicalConsiderations:
          "Kidney function declined by 15% over the last five years.",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic 
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/james/step3.png",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "SGLT2i" },
          { id: "t5", name: "Lifestyle changes" },
        ],
      },
      flow2_sglt2i_at_70: {
        year: 2040,
        nyhaClass: "",
        metrics: {
          bloodPressure: "136/88",
          lvef: "not ordered",
          egfr: 45,
          uacr: "280",
          echocardiography: "not ordered",
          bmi: 25.3,
          hba1c: 5.5,
        },
        age: 70,
        quote:
          "I do feel more tired than before, and my legs swell now and then. But at least I haven't had any major setbacks, and I'm managing as best I can.",
        medicalConsiderations: "CKD Stage 3 (G3aA2)",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "SGLT2i" },
          { id: "t5", name: "Lifestyle changes" },
        ],
      },
      flow3_no_sglt2i_at_60: {
        year: 2030,
        nyhaClass: "",
        hasProgressed: true,
        metrics: {
          bloodPressure: "140/92",
          lvef: "not ordered",
          egfr: 53,
          uacr: "250",
          echocardiography: "not ordered",
          bmi: 25.7,
          hba1c: 5.6,
        },
        age: 60,
        quote:
          "I've been more tired than usual lately. I didn't think much of it as I thought it was just part of getting older.",
        medicalConsiderations:
          "Kidney function declined by 15% over the last five years.",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/james/step3.png",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "SGLT2i" },
          { id: "t5", name: "Lifestyle changes" },
        ],
      },
      flow3_no_sglt2i_at_70: {
        year: 2040,
        nyhaClass: "",
        hasProgressed: true,
        metrics: {
          bloodPressure: "144/94",
          lvef: "not ordered",
          egfr: 35,
          uacr: "350",
          echocardiography: "not ordered",
          bmi: 25.5,
          hba1c: 5.7,
        },
        age: 70,
        quote:
          "My kidneys are in worse shape. I'm more tired than ever, my legs are often swollen, and I'm short of breath. It's getting harder, and I'm worried I might need dialysis.",
        medicalConsiderations: "CKD Stage 3b (G3bA3)",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, Beta-blocker
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "Beta-blocker" },
          { id: "t5", name: "Lifestyle changes" },
        ],
      },
    },
  },
  {
    id: "5",
    name: "Erik",
    age: 55,
    condition: "CKD",
    nyhaClass: "NYHA Class II",
    avatarSrc: "/avatars/erik.png",
    imageSrc: "/characters/05.png",
    overlaySrc: "/overlays/05.png",
    stepImageSrc: "/next-steps/erik/step1.png",
    quote:
      "Doctor, other than a mild headache now and then, I've been feeling fine.",
    medicalConsiderations: "CKD Stage 3a (G3aA3)",
    currentTreatment: `ACEi (max tolerated dose)
Statin (moderate-intensity), Diuretic
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
    historyAndComorbidities: "Hypertension, hypercholesterolemia, overweight",
    treatments: [
      { id: "t1", name: "ACEi (max tolerated dose)" },
      { id: "t2", name: "Statin (moderate-intensity)" },
      { id: "t3", name: "Diuretic" },
      { id: "t4", name: "Lifestyle changes" },
    ],
    comorbidities: ["Hypertension", "Hypercholesterolemia", "Overweight"],
    metrics: {
      bloodPressure: "134/82",
      egfr: 50,
      uacr: "305",
      bmi: "25.6",
      hba1c: "5.6",
    },
    futureStates: {
      monitoring_ecg: {
        year: 2030,
        nyhaClass: "",
        metrics: {
          bloodPressure: "136/84",
          egfr: 35,
          uacr: "420",
          bmi: 25.7,
          hba1c: 5.6,
          lvef: "not ordered",
          echocardiography: "not ordered",
        },
        age: 60,
        quote:
          "I'm managing, but I still feel tired often and can't do as much as I'd like.",
        medicalConsiderations: "CKD Stage 3b (G3bA3)",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, Calcium-channel blocker
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/erik/step3.png",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "Calcium-channel blocker" },
          { id: "t5", name: "Lifestyle changes" },
        ],
        imageSrc: "/characters/05A.png",
        overlaySrc: "/overlays/05A.png",
      },
      flow1_sglt2i_arni_at_52: {
        year: 2030,
        nyhaClass: "",
        metrics: {
          bloodPressure: "132/80",
          egfr: 45,
          uacr: "324",
          bmi: 25.4,
          hba1c: 5.5,
          lvef: "not ordered",
          echocardiography: "not ordered",
        },
        age: 60,
        quote:
          "Five years on and I’m doing alright – so I guess we’re doing something right.",
        medicalConsiderations: "CKD Stage 3a (G3aA3)",
        currentTreatment: `ACEi (max tolerated dose)
Statin (moderate-intensity), Diuretic, SGLT2i
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/erik/step2.png",
        treatments: [
          { id: "t1", name: "ACEi (max tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "SGLT2i" },
          { id: "t5", name: "Lifestyle changes" },
        ],
        imageSrc: "/characters/05B.png",
        overlaySrc: "/overlays/05B.png",
      },
      flow2_loop_diuretic_at_52: {
        year: 2035,
        nyhaClass: "",
        metrics: {
          bloodPressure: "136/84",
          egfr: 35,
          uacr: "420",
          bmi: 25.7,
          hba1c: 5.6,
          lvef: "not ordered",
          echocardiography: "not ordered",
        },
        age: 60,
        quote:
          "My kidney function's declined, and I deal with some swelling and weakness. My skin feels a bit drier too. Is there anything we can do about it?",
        medicalConsiderations: "CKD Stage 3b (G3bA3)",
        currentTreatment: `ACEi (max. tolerated dose)
Statin (moderate-intensity), Diuretic, Calcium-channel blocker
Lifestyle changes (physical activity, dietary changes, and weight loss)`,
        historyAndComorbidities:
          "Uncontrolled hypertension, hypercholesterolemia, overweight",
        stepImageSrc: "/next-steps/erik/step3.png",
        treatments: [
          { id: "t1", name: "ACEi (max. tolerated dose)" },
          { id: "t2", name: "Statin (moderate-intensity)" },
          { id: "t3", name: "Diuretic" },
          { id: "t4", name: "Calcium-channel blocker" },
          { id: "t5", name: "Lifestyle changes" },
        ],
        imageSrc: "/characters/05A.png",
        overlaySrc: "/overlays/05A.png",
      },
      flow3_beta_blocker_at_52: {
        year: 2035,
        nyhaClass: "NYHA Class III-IV",
        hasProgressed: true,
        metrics: {
          bloodPressure: "100/65",
          heartRate: 90,
          lvef: 25,
          ntProBNP: 2100,
          egfr: 58,
          potassium: 4.1,
          echocardiography: "Further reduced LVEF",
        },
        age: 52,
        imageSrc: "/characters/05B.png",
        overlaySrc: "/overlays/05B.png",
        quote:
          "My symptoms have gotten worse. I'm short of breath even with minimal activity, and I worry about the future.",
        medicalConsiderations:
          "HFrEF (NYHA Class III-IV) - Disease progression",
        currentTreatment: `Beta-blocker
ACEi
Loop diuretic`,
        historyAndComorbidities: "Hypertension, history of smoking",
        stepImageSrc: "/next-steps/erik/step4.png",
        treatments: [
          { id: "t1", name: "Beta-blocker" },
          { id: "t2", name: "ACEi" },
          { id: "t3", name: "Loop diuretic" },
        ],
      },
    },
  },
];
