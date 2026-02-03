import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step0_Proposal from './steps/Step0_Proposal';
import Step1_TimeMachine from './steps/Step1_TimeMachine';
import Step2_GiftReveal from './steps/Step2_GiftReveal';
import Certificate from './Certificate';

export default function InteractiveCard() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => prev + 1);

    return (
        <div className="w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-3xl p-8 md:p-12 text-center"
                >
                    {step === 0 && <Step0_Proposal onNext={nextStep} />}
                    {step === 1 && <Step1_TimeMachine onNext={nextStep} />}
                    {step === 2 && <Step2_GiftReveal onNext={nextStep} />}
                    {step === 3 && <Certificate />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
