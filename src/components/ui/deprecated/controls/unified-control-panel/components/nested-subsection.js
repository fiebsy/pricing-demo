"use strict";
/**
 * Nested Subsection
 *
 * Renders subsections with support for nesting depth and gradient fade
 */
'use client';
/**
 * Nested Subsection
 *
 * Renders subsections with support for nesting depth and gradient fade
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedSubsection = exports.NestedCard = exports.NestedInset = exports.GradientFadeOverlay = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
const control_primitives_1 = require("./control-primitives");
exports.GradientFadeOverlay = (0, react_1.memo)(({ config, className }) => {
    if (!config.enabled)
        return null;
    const { direction = 'to-b', from = 'transparent', to = 'var(--color-background-secondary)', opacity = 50, } = config;
    const directionToCss = {
        'to-t': 'to top',
        'to-b': 'to bottom',
        'to-l': 'to left',
        'to-r': 'to right',
        'to-br': 'to bottom right',
        'to-bl': 'to bottom left',
        'to-tr': 'to top right',
        'to-tl': 'to top left',
    };
    return (<div className={(0, cx_1.cx)('pointer-events-none absolute inset-0 rounded-md', className)} style={{
            background: `linear-gradient(${directionToCss[direction] || 'to bottom'}, ${from}, ${to})`,
            opacity: opacity / 100,
        }}/>);
});
exports.GradientFadeOverlay.displayName = 'GradientFadeOverlay';
exports.NestedInset = (0, react_1.memo)(({ depth, gradientFade, children, className }) => {
    const depthStyles = {
        1: 'bg-secondary/50 border-secondary/50',
        2: 'bg-tertiary/50 border-tertiary/50',
        3: 'bg-quaternary/50 border-quaternary/50',
    };
    const bgClass = depthStyles[Math.min(depth, 3)] || depthStyles[1];
    return (<div className={(0, cx_1.cx)('relative overflow-hidden rounded-md border p-3', bgClass, className)}>
      {gradientFade?.enabled && <exports.GradientFadeOverlay config={gradientFade}/>}
      <div className="relative z-10">{children}</div>
    </div>);
});
exports.NestedInset.displayName = 'NestedInset';
exports.NestedCard = exports.NestedInset;
exports.NestedSubsection = (0, react_1.memo)(({ subsection, sectionId, onChange, depth = 0, }) => {
    const { title, description, controls, columns = 1, collapsible = false, defaultCollapsed = false, gradientFade, children, } = subsection;
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)(defaultCollapsed);
    const handleControlChange = (0, react_1.useCallback)((controlId) => (value) => {
        onChange({ controlId, sectionId, value });
    }, [onChange, sectionId]);
    const toggleCollapse = (0, react_1.useCallback)(() => {
        setIsCollapsed((prev) => !prev);
    }, []);
    const renderControl = (control) => {
        if (!control || !control.id) {
            console.warn('NestedSubsection: Invalid control detected', control);
            return null;
        }
        if (control.type === 'inline-toggle') {
            return (<control_primitives_1.ControlRenderer key={control.id} config={control} onChange={handleControlChange(control.id)}/>);
        }
        if (control.type === 'custom') {
            return (<div key={control.id}>
          {control.label && <control_primitives_1.SectionHeader title={control.label}/>}
          {control.render()}
        </div>);
        }
        if (control.type === 'color-array') {
            return (<div key={control.id}>
          <control_primitives_1.SectionHeader title={control.label}/>
          <control_primitives_1.ControlRenderer config={control} onChange={handleControlChange(control.id)}/>
        </div>);
        }
        return (<control_primitives_1.ControlGroup key={control.id} label={control.label} description={control.description}>
        <control_primitives_1.ControlRenderer config={control} onChange={handleControlChange(control.id)}/>
      </control_primitives_1.ControlGroup>);
    };
    const validControls = controls.filter((control) => control != null);
    const content = (<div className="space-y-4">
      {title && (collapsible ? (<button type="button" onClick={toggleCollapse} className="flex w-full items-center justify-between text-left hover:opacity-80">
            <div>
              <h5 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                {title}
              </h5>
              {description && (<p className="text-tertiary mt-0.5 text-[11px]">{description}</p>)}
            </div>
            <span className={(0, cx_1.cx)('text-tertiary text-xs transition-transform duration-200', isCollapsed ? '-rotate-90' : 'rotate-0')}>
              ▼
            </span>
          </button>) : (<div>
            <h5 className="text-secondary text-xs font-semibold uppercase tracking-wider">
              {title}
            </h5>
            {description && (<p className="text-tertiary mt-0.5 text-[11px]">{description}</p>)}
          </div>))}

      {(!collapsible || !isCollapsed) && (<>
          {validControls.length > 0 && (columns === 1 ? (<div className="space-y-4">{validControls.map(renderControl)}</div>) : (<control_primitives_1.ControlGrid columns={columns}>{validControls.map(renderControl)}</control_primitives_1.ControlGrid>))}

          {children && children.length > 0 && (<div className="mt-3 space-y-3">
              {children.map((child, index) => (<exports.NestedSubsection key={`${sectionId}-nested-${index}`} subsection={child} sectionId={sectionId} onChange={onChange} depth={(child.depth ?? depth) + 1}/>))}
            </div>)}
        </>)}
    </div>);
    const shouldWrap = depth > 0 || gradientFade?.enabled;
    if (shouldWrap) {
        return (<exports.NestedInset depth={depth} gradientFade={gradientFade}>
        {content}
      </exports.NestedInset>);
    }
    return content;
});
exports.NestedSubsection.displayName = 'NestedSubsection';
//# sourceMappingURL=nested-subsection.js.map