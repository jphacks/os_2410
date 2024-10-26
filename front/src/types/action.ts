export type SleepDuration = '0-3' | '3-5' | '5-7' | '7+';
export type MealTime = '朝食' | '昼食' | '夕食' | 'おやつ';
export type MealQuality = 'balanced' | 'unhealthy' | 'light' | 'skipped';
export type ExerciseIntensity = 'light' | 'moderate' | 'intense' | 'none';

export interface ActionDetails {
  sleep?: {
    duration: SleepDuration;
  };
  meal?: {
    time: MealTime;
    quality: MealQuality;
  };
  exercise?: {
    intensity: ExerciseIntensity;
  };
}
