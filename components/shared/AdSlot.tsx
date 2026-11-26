export type AdSlotPlacement =
  | 'below-intro'
  | 'between-sections'
  | 'in-article'
  | 'end-of-content';

/**
 * Configurable advertisement placement container prepared for Google AdSense.
 * Keeps fixed minimum height to avoid CLS and stays outside interactive calculator inputs/results.
 */
export const AD_CONFIGURATION = {
  enabled: true,
  showPlaceholderLabel: true,
};

export function AdSlot({
  placement,
  className = '',
}: {
  placement: AdSlotPlacement;
  className?: string;
}) {
  if (!AD_CONFIGURATION.enabled) return null;

  return (
    <aside
      aria-label="Advertisement slot"
      data-ad-placement={placement}
      className={`my-6 flex min-h-[90px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-center ${className}`}
    >
      {AD_CONFIGURATION.showPlaceholderLabel && (
        <span className="text-xs text-slate-400">
          Reserved Advertisement Placement ({placement})
        </span>
      )}
    </aside>
  );
}
