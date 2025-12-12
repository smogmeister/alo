import { Profile } from "@/types/profile";
import profileData from "@/data/profile.json";

/**
 * Loads profile data
 */
export function loadProfile(): Profile {
  return profileData as Profile;
}












