"use strict";
/**
 * Section Renderer
 *
 * Renders a section with collapsible content using Base UI Collapsible.
 */
'use client';
/**
 * Section Renderer
 *
 * Renders a section with collapsible content using Base UI Collapsible.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionRenderer = void 0;
const collapsible_1 = require("@base-ui/react/collapsible");
const cx_1 = require("@/components/utils/cx");
const control_renderer_1 = require("./control-renderer");
function SectionHeader({ title, isOpen }) {
    return (<collapsible_1.Collapsible.Trigger className={(0, cx_1.cx)('group flex w-full items-center justify-between py-3 text-left', 'transition-opacity duration-150 hover:opacity-80')}>
      <h4 className="text-primary text-sm font-semibold">{title}</h4>
      <ChevronIcon isOpen={isOpen}/>
    </collapsible_1.Collapsible.Trigger>);
}
function ChevronIcon({ isOpen }) {
    return (<svg className={(0, cx_1.cx)('text-tertiary size-4 transition-transform duration-200 ease-out', isOpen ? 'rotate-0' : '-rotate-90')} viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
function GroupRenderer({ group, sectionId, onChange }) {
    const { title, description, controls, columns = 1 } = group;
    const gridClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    }[columns];
    return (<div className="space-y-4">
      {title && (<div className="border-secondary -mx-4 border-b px-4 pb-2">
          <h5 className="text-secondary font-mono text-xs font-semibold uppercase tracking-wider">
            {title}
          </h5>
          {description && (<p className="text-tertiary mt-1 text-xs">{description}</p>)}
        </div>)}

      <div className={(0, cx_1.cx)('grid gap-4', gridClass)}>
        {controls.map((control) => (<control_renderer_1.ControlGroup key={control.id} label={control.label} description={control.description}>
            <control_renderer_1.ControlRenderer control={control} onChange={(value) => onChange({
                controlId: control.id,
                sectionId,
                value,
            })}/>
          </control_renderer_1.ControlGroup>))}
      </div>
    </div>);
}
function SectionRenderer({ section, onChange, defaultCollapsed = false, }) {
    const { id, title, groups } = section;
    const sectionTitle = title || section.label;
    return (<section id={id} data-section-id={id} className="scroll-mt-32">
      <div className="bg-primary border-primary overflow-hidden rounded-lg border">
        <collapsible_1.Collapsible.Root defaultOpen={!defaultCollapsed}>
          {/* Header */}
          <div className="border-secondary border-b px-4">
            <SectionHeader title={sectionTitle} isOpen={!defaultCollapsed}/>
          </div>

          {/* Collapsible content */}
          <collapsible_1.Collapsible.Panel className={(0, cx_1.cx)('overflow-hidden', 'transition-[height] duration-300 ease-out', 'data-[closed]:h-0')} style={{
            height: 'var(--collapsible-panel-height)',
        }}>
            <div className="space-y-6 p-4">
              {groups.map((group, index) => (<GroupRenderer key={`${id}-group-${index}`} group={group} sectionId={id} onChange={onChange}/>))}
            </div>
          </collapsible_1.Collapsible.Panel>
        </collapsible_1.Collapsible.Root>
      </div>
    </section>);
}
exports.SectionRenderer = SectionRenderer;
//# sourceMappingURL=section-renderer.js.map