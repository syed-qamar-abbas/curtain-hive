import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { services } from './data';

type GuidedForm = { service: string; room: string; project: string; style: string; need: string; budget: string; method: string; city: string; location: string; name: string; phone: string; email: string; date: string; notes: string };
type Draft = {
  form: GuidedForm; setForm: Dispatch<SetStateAction<GuidedForm>>;
  step: number; setStep: Dispatch<SetStateAction<number>>;
  ready: boolean; setReady: Dispatch<SetStateAction<boolean>>;
  error: string; setError: Dispatch<SetStateAction<string>>;
};
const GuidedDraft = createContext<Draft | null>(null);

/** The draft lives above the mode switch, so switching forms never discards it. */
export function ConsultationDraftProvider({ children }: { children: ReactNode }) {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<GuidedForm>(() => ({
    service: services.find(service => service.slug === params.get('service'))?.name || '',
    room: params.get('room') || '', project: '', style: params.get('style') || 'Contemporary',
    need: params.get('need') || '', budget: '', method: 'WhatsApp', city: '', location: '',
    name: '', phone: '', email: '', date: '', notes: '',
  }));
  return <GuidedDraft.Provider value={{ form, setForm, step, setStep, ready, setReady, error, setError }}>{children}</GuidedDraft.Provider>;
}

export function useGuidedDraft() {
  const draft = useContext(GuidedDraft);
  if (!draft) throw new Error('Guided planner requires its draft provider.');
  return draft;
}

/** Introduce the new question after routing and below the current sticky header. */
export function useWizardStepFocus(step: number, ready: boolean) {
  const wizard = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const heading = wizard.current?.querySelector<HTMLHeadingElement>('.wizard-stage h2, .confirmation h2');
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      const headerBottom = document.querySelector('.header')?.getBoundingClientRect().bottom || 0;
      window.scrollTo({ top: Math.max(0, scrollY + heading.getBoundingClientRect().top - headerBottom - 24), behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [step, ready]);
  return wizard;
}
