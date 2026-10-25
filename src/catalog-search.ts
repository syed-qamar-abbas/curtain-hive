import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigationType, useSearchParams } from 'react-router-dom';

/** Immediate typing and filtering; shareable URLs replace rather than grow history. */
export function useCatalogSearch() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigationType = useNavigationType();
  const urlQuery = params.get('q') || '';
  const [query, setQuery] = useState(urlQuery);
  const ownUpdates = useRef(new Set<string>());

  useEffect(() => {
    if (navigationType === 'REPLACE' && ownUpdates.current.delete(urlQuery)) return;
    ownUpdates.current.clear();
    setQuery(urlQuery);
  }, [location.key, navigationType, urlQuery]);

  useEffect(() => {
    if (query === urlQuery) return;
    const timer = window.setTimeout(() => {
      ownUpdates.current.add(query);
      setParams(previous => {
        const next = new URLSearchParams(previous);
        if (query) next.set('q', query); else next.delete('q');
        return next;
      }, { replace: true, preventScrollReset: true });
    }, 250);
    return () => clearTimeout(timer);
  }, [query, urlQuery, setParams]);

  return [query, setQuery] as const;
}
