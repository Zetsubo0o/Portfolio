/**
 * SMILE theme atmosphere — drifting warm light-orbs (aurora) + a filmic grain
 * overlay for a premium, alive backdrop. Sits behind the 3D smile scene.
 * Mounted once globally (App) when SMILE is true. Pure CSS motion.
 * REVERT: unmounts when SMILE = false (see src/theme.js).
 */
export default function SmileAtmosphere() {
  return (
    <div className="smile-atmos pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <span className="smile-orb orb-a" />
      <span className="smile-orb orb-b" />
      <span className="smile-orb orb-c" />
      <span className="smile-grain" />
    </div>
  )
}
