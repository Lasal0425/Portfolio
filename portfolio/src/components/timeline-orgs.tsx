import Image from "next/image";
import { timeline, featuredRoles, collapsedRoles } from "@/lib/content";
import { TimelineRoleList } from "@/components/timeline-role-list";

/**
 * The org-by-org role list, shared between the standalone /timeline page
 * and the home page's one-pager Timeline section — same content, same ids
 * (so citation links and :target highlighting work identically wherever
 * it's rendered).
 */
export function TimelineOrgs() {
  return (
    <div className="flex flex-col gap-14">
      {timeline.map((org) => {
        const featured = featuredRoles(org);
        const collapsed = collapsedRoles(org);
        return (
          <section key={org.id} id={org.id} className="scroll-mt-20">
            <div className="flex items-center gap-3">
              {org.logoUrl && (
                <span className="flex h-9 w-16 items-center justify-center rounded bg-white">
                  <Image
                    src={org.logoUrl}
                    alt={org.name}
                    width={56}
                    height={24}
                    className="max-h-6 w-auto object-contain"
                  />
                </span>
              )}
              <div>
                <h3 className="text-lg font-medium text-[var(--color-fg)]">{org.name}</h3>
                <p className="text-xs text-[var(--color-fg-muted)]">
                  {[org.location, org.totalDuration].filter(Boolean).join(" — ")}
                </p>
              </div>
            </div>

            <TimelineRoleList featured={featured} collapsed={collapsed} />
          </section>
        );
      })}
    </div>
  );
}
