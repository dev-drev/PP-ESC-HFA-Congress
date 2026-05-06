'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Action {
  id: string;
  text: string;
}

interface ActionSelectorProps {
  actions: Action[];
  onSelect: (actionId: string) => void;
  isEndCase?: boolean;
  onGoBack?: () => void;
  selectedActionId?: string | null;
  restorePhase?: string | null;
}

export default function ActionSelector({
  actions,
  onSelect,
  isEndCase = false,
  onGoBack,
  selectedActionId,
  restorePhase,
}: ActionSelectorProps) {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [mainAction, setMainAction] = useState<Action | null>(null);
  const [showFollowUpOptions, setShowFollowUpOptions] = useState(false);
  const restoredFromUrlRef = useRef(false);
  const router = useRouter();

  const isHFrEF = actions.some((action) =>
    action.text.includes('Add loop diuretic and monitor Robert'),
  );

  const isJoana = actions.some((action) =>
    action.text.includes('antihypertensive therapy'),
  );

  const isJames = actions.some((action) =>
    action.text.includes('Confirm suspected CKD diagnosis'),
  );

  const isErik = actions.some((action) =>
    action.text.includes('Initiate calcium-channel blocker')
  );

  const hfpefFollowUpActions = [
    {
      id: 'beta_blocker',
      text: 'Prescribe Beta-Blocker and uptitrate loop diuretic',
    },
    { id: 'prescribe_sglt2i', text: 'Prescribe an SGLT2i' },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const hfrefFollowUpActions = [
    {
      id: 'continue_acei',
      text: 'Continue with ACEi and Beta-Blocker',
    },
    {
      id: 'prescribe_sglt2i_mra',
      text: 'Prescribe SGLT2i, MRA, and switch from ACEi to ARNI',
    },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const joanaFollowUpActions = [
    {
      id: 'add_loop_diuretic',
      text: 'Add loop diuretic',
    },
    {
      id: 'add_sglt2i_loop_diuretic',
      text: 'Add SGLT2i and loop diuretic',
    },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const jamesFollowUpActions = [
    {
      id: 'confirm_sglt2i_followup',
      text: 'Confirm suspected CKD diagnosis and initiate SGLT2i',
    },
    {
      id: 'add_beta_blocker',
      text: 'Add beta-blocker',
    },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const jamesSglt2iFollowUpActions = [
    {
      id: 'proceed-james-flow1',
      text: 'Proceed',
    },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const erikFollowUpActions = [
    {
      id: 'add-sglt2i-erik',
      text: 'Add SGLT2i',
    },
    {
      id: 'intensify-statin',
      text: 'Intensify statin therapy, advise dietary restrictions',
    },
    {
      id: 'go-back',
      text: 'Go back',
    },
  ];

  const erikSglt2iFollowUpActions = [
    {
      id: 'proceed-erik-flow1',
      text: 'Proceed',
    },
    {
      id: 'time-travel',
      text: 'Travel back in time',
    },
  ];

  // Sync selectedAction with prop
  useEffect(() => {
    // When coming back from a final page with phase=followup, jump straight to the
    // follow-up panel skipping the 1500ms ActionSelector animation timer.
    if (
      selectedActionId &&
      restorePhase === 'followup' &&
      !restoredFromUrlRef.current
    ) {
      const allActions = [
        ...actions,
        ...hfpefFollowUpActions,
        ...hfrefFollowUpActions,
        ...joanaFollowUpActions,
        ...jamesFollowUpActions,
        ...jamesSglt2iFollowUpActions,
        ...erikFollowUpActions,
        ...erikSglt2iFollowUpActions,
      ];
      const action = allActions.find(a => a.id === selectedActionId);
      if (action) {
        restoredFromUrlRef.current = true;
        setMainAction(action);
        setShowFollowUpOptions(true);
        setSelectedAction(null);
        return;
      }
    }

    if (selectedActionId) {
      const action = [...actions, ...hfpefFollowUpActions, ...hfrefFollowUpActions, ...joanaFollowUpActions, ...jamesFollowUpActions, ...jamesSglt2iFollowUpActions, ...erikFollowUpActions, ...erikSglt2iFollowUpActions]
        .find(a => a.id === selectedActionId);
      if (action) {
        setSelectedAction(action);
      }
    } else {
      setSelectedAction(null);
    }
  }, [selectedActionId, actions, restorePhase]);

  useEffect(() => {
    if (!selectedAction) return;

    const isMonitoringAction =
      selectedAction.id === 'monitoring' ||
      selectedAction.id === 'add-loop-diuretic' ||
      selectedAction.id === 'optimize-antihypertensive' ||
      selectedAction.id === 'uptitrate-statin-diuretic' ||
      selectedAction.id === 'continue-monitoring-erik' ||
      selectedAction.id === 'confirm-ckd-initiate-sglt2i' ||
      selectedAction.id === 'initiate-sglt2i-erik';

    if (isMonitoringAction) {
      const timer = setTimeout(() => {
        setShowFollowUpOptions(true);
        setMainAction(selectedAction);
        setSelectedAction(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selectedAction]);

  const navigateTo = (targetUrl: string) => {
    router.push(targetUrl);
  };

  const handleActionClick = (action: Action) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (showFollowUpOptions) {
      // Handle go-back and time-travel in follow-up options
      if (action.id === 'go-back' || action.id === 'time-travel') {
        // Navigate back to patient page with hard reload to reset everything
        const patientId = isHFrEF ? '2' : isJoana ? '3' : isJames ? '4' : isErik ? '5' : '1';
        window.location.href = `/patient/${patientId}`;
        return;
      }
      
      // Follow-up actions with delay
      if (isJames) {
        if (action.id === 'proceed-james-flow1') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/james-flow1-age70');
          }, 2000);
        } else if (action.id === 'confirm_sglt2i_followup') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/james-flow2-age60');
          }, 2000);
        } else if (action.id === 'add_beta_blocker') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/james-flow3-age60');
          }, 2000);
        }
      } else if (isJoana) {
        if (action.id === 'add_loop_diuretic') {
          onSelect(action.id);  // Update step image first
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/joana-five-years');
          }, 2000);
        } else if (action.id === 'add_sglt2i_loop_diuretic') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/joana-optimize-case');
          }, 2000);
        }
      } else if (isErik) {
        if (action.id === 'proceed-erik-flow1') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/erik-flow1-age52');
          }, 2000);
        } else if (action.id === 'add-sglt2i-erik') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/erik-flow2-age52');
          }, 2000);
        } else if (action.id === 'intensify-statin') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/erik-flow3-age52');
          }, 2000);
        }
      } else if (isHFrEF) {
        if (action.id === 'continue_acei') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/continue-acei-case');
          }, 2000);
        } else if (action.id === 'prescribe_sglt2i_mra') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/sglt2i-arni-case');
          }, 2000);
        }
      } else {
        // Linda's follow-up actions
        if (action.id === 'beta_blocker') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/sglt2i-case2');
          }, 2000);
        } else if (action.id === 'prescribe_sglt2i') {
          onSelect(action.id);
          setSelectedAction(action);
          setTimeout(() => {
            navigateTo('/beta-blocker-case');
          }, 2000);
        }
      }
    } else {
      // Main actions
      if (isJames) {
        // For James - both actions stay on patient page
        if (action.id === 'confirm-ckd-initiate-sglt2i' || action.id === 'uptitrate-statin-diuretic') {
          setSelectedAction(action);
          onSelect(action.id);
        }
      } else if (isErik) {
        // For Erik - both actions stay on patient page and show follow-up options
        if (action.id === 'initiate-sglt2i-erik' || action.id === 'continue-monitoring-erik') {
          setSelectedAction(action);
          onSelect(action.id);
        }
      } else {
        setSelectedAction(action);
        onSelect(action.id);
      }
    }
  };

  const handleProceed = () => {
    if (!selectedAction) return;

    if (selectedAction.id === 'rapid-initiation') {
      navigateTo('/end2');
    } else if (selectedAction.id === 'prescribe-sglt2i') {
      navigateTo('/sglt2i-case');
    } else if (isJoana) {
      if (selectedAction.id === 'optimize-antihypertensive') {
        navigateTo('/joana-optimize-case');
      } else if (selectedAction.id === 'add-sglt2i') {
        navigateTo('/joana-add-sglt2i-case');
      }
    }
  };

  // Determine which follow-up actions to show for James
  const jamesCurrentFollowUpActions = mainAction?.id === 'confirm-ckd-initiate-sglt2i'
    ? jamesSglt2iFollowUpActions
    : jamesFollowUpActions;

  // Determine which follow-up actions to show for Erik
  const erikCurrentFollowUpActions = mainAction?.id === 'initiate-sglt2i-erik'
    ? erikSglt2iFollowUpActions
    : erikFollowUpActions;

  const followUpActions = isErik ? erikCurrentFollowUpActions : (isJames ? jamesCurrentFollowUpActions : (isJoana ? joanaFollowUpActions : (isHFrEF ? hfrefFollowUpActions : hfpefFollowUpActions)));
  const displayActions = showFollowUpOptions ? followUpActions : actions;

  // Only separate go-back and restart for end case (not for follow-up actions)
  const shouldUseSideBySide = isEndCase && displayActions.some(a => a.id === 'restart');
  const topRowActions = shouldUseSideBySide ? displayActions.filter(a => a.id === 'go-back' || a.id === 'restart') : [];
  const otherActions = shouldUseSideBySide ? displayActions.filter(a => a.id !== 'go-back' && a.id !== 'restart') : displayActions;

  const showProceedButtons = selectedAction && 
    (selectedAction.id === 'rapid-initiation' || 
     selectedAction.id === 'prescribe-sglt2i' || 
     selectedAction.id === 'add-sglt2i') && 
    !showFollowUpOptions;
    
  // Determine button texts based on selected action
  const isMonitoringOrSGLT2i = selectedAction?.id === 'monitoring' || selectedAction?.id === 'prescribe-sglt2i';
  const isRapidInitiation = selectedAction?.id === 'rapid-initiation';
  const isJoanaAddSGLT2i = selectedAction?.id === 'add-sglt2i';
  
  const goBackText = (isRapidInitiation || isMonitoringOrSGLT2i || isJoanaAddSGLT2i) ? 'Travel back in time' : 'Go back';
  const proceedText = isRapidInitiation 
    ? 'See Robert again in five years' 
    : isMonitoringOrSGLT2i 
      ? 'See Linda again in five years'
      : isJoanaAddSGLT2i
        ? 'See Joana again in five years'
        : 'Proceed';

  return (
    <div className="space-y-4 max-w-[500px] z-10 w-full patient-panel-full">
      {/* Show Go Back and Proceed buttons if action is selected */}
      {showProceedButtons && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="space-y-4"
        >
       
          <div className={(isRapidInitiation || isMonitoringOrSGLT2i || isJoanaAddSGLT2i) ? "space-y-4" : "flex gap-4"}>
            {/* For rapid-initiation, monitoring, SGLT2i, and Joana add-sglt2i, show proceed button first (on top) */}
            {(isRapidInitiation || isMonitoringOrSGLT2i || isJoanaAddSGLT2i) && (
              <>
                {/* Proceed Button (See Robert again in five years) */}
                <motion.button
                  onClick={handleProceed}
                  className="w-full p-5 rounded-2xl lg:rounded-full  text-left transition-all duration-300 flex items-center justify-between relative bg-[#03585e]/20 border-4 border-yellow-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)] focus:border-yellow-400 active:border-yellow-400 focus:outline-none"
                >
                  <span className="font-medium text-lg 2xl:text-2xl">{proceedText}</span>
                  <Image
                    src="/arrow-yellow-blur.svg"
                    alt="Arrow"
                    title="Arrow"
                    width={43}
                    height={36}
                    className="ml-4"
                  />
                </motion.button>
                
                {/* Go Back Button (Travel back in time) */}
                <motion.button
                  onClick={() => {
                    const patientId = isHFrEF ? '2' : isJoana ? '3' : isJames ? '4' : isErik ? '5' : '1';
                    window.location.href = `/patient/${patientId}`;
                  }}
                  className="w-full p-5 rounded-2xl lg:rounded-full  text-left transition-all duration-300 flex items-center justify-between relative bg-[#03585e]/20 border-4 border-[#044449] text-white"
                >
                  <Image
                    src="/arrow-gray.svg"
                    alt="Arrow"
                    title="Arrow"
                    width={43}
                    height={36}
                    className="mr-4 rotate-180 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
                  />
                  <span className="font-medium text-lg 2xl:text-2xl">{goBackText}</span>
                </motion.button>
              </>
            )}
            
            {/* For other actions, show side by side */}
            {!(isRapidInitiation || isMonitoringOrSGLT2i || isJoanaAddSGLT2i) && (
              <>
                {/* Go Back Button */}
                <motion.button
                  onClick={() => {
                    const patientId = isHFrEF ? '2' : isJoana ? '3' : isJames ? '4' : isErik ? '5' : '1';
                    window.location.href = `/patient/${patientId}`;
                  }}
                  className="flex-1 p-5 rounded-2xl lg:rounded-full  text-left transition-all duration-300 flex items-center justify-between relative bg-[#03585e]/80 border-4 border-[#044449] text-white"
                >
                  <Image
                    src="/arrow-gray.svg"
                    alt="Arrow"
                    title="Arrow"
                    width={43}
                    height={36}
                    className="mr-4 rotate-180 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
                  />
                  <span className="font-medium text-lg 2xl:text-2xl">{goBackText}</span>
                </motion.button>
                
                {/* Proceed Button */}
                <motion.button
                  onClick={handleProceed}
                  className="flex-1 p-5 rounded-2xl lg:rounded-full  text-left transition-all duration-300 flex items-center justify-between relative bg-[#03585e]/20 border-4 border-yellow-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)] focus:border-yellow-400 active:border-yellow-400 focus:outline-none"
                >
                  <span className="font-medium text-lg 2xl:text-2xl">{proceedText}</span>
<Image
                  src="/arrow-yellow-blur.svg"
                  alt="Arrow"
                  title="Arrow"
                  width={43}
                  height={36}
                  className="ml-4 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
                />
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Top row with go-back and restart side by side */}
      {!showProceedButtons && topRowActions.length > 0 && (
        <div className="flex gap-4">
          {topRowActions.map((action, idx) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05, ease: 'easeOut' }}
              onClick={() => handleActionClick(action)}
              className={`flex-1 p-5 rounded-2xl lg:rounded-full  text-left transition-all duration-300 flex items-center justify-between relative ${
                isEndCase
                  ? action.id === 'restart'
                    ? 'bg-[#03585e]/30 border-4 border-yellow-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                    : 'bg-[#03585e]/30 border-4 border-[#044449] text-white'
                  : selectedAction?.id === action.id
                    ? action.id === 'add-loop-diuretic' || action.id === 'monitoring' || action.id === 'confirm_sglt2i_followup' || action.id === 'add_beta_blocker'
                      ? 'bg-yellow-400/20 border-4 border-yellow-400'
                      : 'bg-teal-500 text-white ring-4 ring-teal-300'
                    : action.id === 'add-loop-diuretic' || action.id === 'monitoring' || action.id === 'continue_acei' || action.id === 'beta_blocker' || action.id === 'restart' || action.id === 'confirm_sglt2i_followup' || action.id === 'add_beta_blocker'
                      ? 'bg-[#03585e]/30 border-4 border-yellow-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                      : 'bg-[#03585e]/30 border-4 border-[#044449] text-white'
              }`}
            >
              {(action.id === 'go-back' || action.id === 'time-travel') && (
                <Image
                  src="/arrow-gray.svg"
                  alt="Arrow"
                  title="Arrow"
                  width={43}
                  height={36}
                  className="mr-4 rotate-180 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
                />
              )}
              <span className="font-medium text-lg 2xl:text-2xl">{action.text}</span>
              {action.id === 'restart' ? (
                <Image
                  src="/restart-icon.svg"
                  alt="Restart"
                  title="Restart"
                  width={53}
                  height={53}
                  className="ml-4 w-[73px] h-[73px] right-[5px] absolute"
                />
              ) : action.id !== 'go-back' && action.id !== 'time-travel' ? (
                <Image
                  src={
                    action.id === 'add-loop-diuretic' || action.id === 'monitoring' || action.id === 'optimize-antihypertensive' || action.id === 'continue_acei' || action.id === 'beta_blocker'
                      ? '/arrow-yellow-blur.svg'
                      : '/arrow-gray.svg'
                  }
                  alt="Arrow"
                  title="Arrow"
                  width={43}
                  height={36}
                  className="ml-4"
                />
              ) : null}
            </motion.button>
          ))}
        </div>
      )}
      
      {/* Other actions in separate rows */}
      {!showProceedButtons && otherActions.map((action, index) => (
        <motion.button
          key={action.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
          onClick={() => handleActionClick(action)}
          className={`w-full py-5 px-8 rounded-2xl lg:rounded-full text-left transition-all duration-300 flex items-center justify-between relative ${
            isEndCase
              ? action.id === 'restart'
                ? 'bg-[#03585e]/20 border-4 border-yellow-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                : 'bg-[#03585e]/20 border-4 border-[#044449] text-white'
              : selectedAction?.id === action.id
                ? action.id === 'add-loop-diuretic' || action.id === 'monitoring' || action.id === 'optimize-antihypertensive' || action.id === 'prescribe_sglt2i_mra' || action.id === 'continue_acei' || action.id === 'beta_blocker' || action.id === 'prescribe_sglt2i' || action.id === 'add_loop_diuretic' || action.id === 'add_sglt2i_loop_diuretic' || action.id === 'confirm-ckd-initiate-sglt2i' || action.id === 'uptitrate-statin-diuretic' || action.id === 'initiate-sglt2i-erik' || action.id === 'continue-monitoring-erik' || action.id === 'add-sglt2i-erik' || action.id === 'intensify-statin' || action.id === 'confirm_sglt2i_followup' || action.id === 'add_beta_blocker' || action.id === 'proceed-erik-flow1' || action.id === 'proceed-james-flow1'
                  ? 'bg-yellow-400/20 border-4 border-yellow-400 focus:border-yellow-400 active:border-yellow-400 focus:outline-none'
                  : 'bg-teal-500 text-white ring-4 ring-teal-300'
                : 'bg-[#03585e]/20 border-4 border-[#044449] text-white'
          }`}
        >
          {(action.id === 'go-back' || action.id === 'time-travel') && (
            <Image
              src="/arrow-gray.svg"
              alt="Arrow"
              title="Arrow"
              width={43}
              height={36}
              className="mr-4 rotate-180 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
            />
          )}
          <span className="font-medium text-md 2xl:text-xl">{action.text}</span>
          {action.id === 'restart' ? (
<Image
                src="/restart-icon.svg"
                alt="Restart"
                title="Restart"
                width={53}
                height={53}
                className="ml-4 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
              />
          ) : action.id !== 'go-back' && action.id !== 'time-travel' ? (
            <Image
              src={
                (selectedAction?.id === action.id && (action.id === 'add-loop-diuretic' || action.id === 'add_loop_diuretic' || action.id === 'monitoring' || action.id === 'optimize-antihypertensive' || action.id === 'continue_acei' || action.id === 'beta_blocker' || action.id === 'prescribe_sglt2i_mra' || action.id === 'prescribe_sglt2i' || action.id === 'add_sglt2i_loop_diuretic' || action.id === 'confirm-ckd-initiate-sglt2i' || action.id === 'uptitrate-statin-diuretic' || action.id === 'initiate-sglt2i-erik' || action.id === 'continue-monitoring-erik' || action.id === 'add-sglt2i-erik' || action.id === 'intensify-statin' || action.id === 'confirm_sglt2i_followup' || action.id === 'add_beta_blocker' || action.id === 'proceed-erik-flow1' || action.id === 'proceed-james-flow1'))
                  ? '/arrow-yellow-blur.svg'
                  : '/arrow-gray.svg'
              }
              alt="Arrow"
              title="Arrow"
              width={43}
              height={36}
              className="ml-4 w-[32px] h-[32px] 2xl:w-[43px] 2xl:h-[43px]"
            />
          ) : null}
        </motion.button>
      ))}
    </div>
  );
}