import { useMemo } from 'react';
import scenarios from '../data/scenarios.json';

export function useScenario(scenarioId) {
  return useMemo(() => {
    return scenarios.scenarios.find((s) => s.id === scenarioId) ?? null;
  }, [scenarioId]);
}

export function useAllScenarios() {
  return scenarios.scenarios;
}

export function useStep(scenario, stepId) {
  return useMemo(() => {
    if (!scenario || !stepId) return null;
    return scenario.steps.find((s) => s.id === stepId) ?? null;
  }, [scenario, stepId]);
}
