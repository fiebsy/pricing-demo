'use client'

import { Badge } from '@/components/ui/core/primitives/badge'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Clock01Icon from '@hugeicons-pro/core-stroke-rounded/Clock01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Alert01Icon from '@hugeicons-pro/core-stroke-rounded/Alert01Icon'

export default function TestBadgePage() {
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl font-semibold text-primary">Badge Icon Test</h1>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-secondary">Badges with Icons (Testing Fix)</h2>
          
          <div className="flex flex-wrap gap-2">
            <Badge size="sm" color="gray">
              <HugeIcon icon={Clock01Icon} size={12} className="text-tertiary/50" strokeWidth={2.5} />
              12 months
            </Badge>
            
            <Badge size="sm" color="success">
              <HugeIcon icon={Tick01Icon} size={12} className="text-utility-success-500" strokeWidth={2.5} />
              Completed
            </Badge>
            
            <Badge size="sm" color="warning">
              <HugeIcon icon={Alert01Icon} size={12} className="text-utility-warning-500" strokeWidth={2.5} />
              Pending
            </Badge>
            
            <Badge size="sm" color="gray">
              Order #7805386
              <div className="relative" style={{ width: 12, height: 12 }}>
                <svg width="12" height="12" style={{ transform: 'rotate(-90deg)' }} className="absolute inset-0">
                  <circle
                    cx="6"
                    cy="6"
                    r="4.75"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ stroke: 'var(--color-border-secondary)' }}
                  />
                  <circle
                    cx="6"
                    cy="6"
                    r="4.75"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="29.845130209103033"
                    strokeDashoffset="18.03155011944893"
                    style={{
                      stroke: 'var(--color-utility-warning-500)',
                      transition: 'stroke-dashoffset 0.3s ease',
                    }}
                  />
                </svg>
              </div>
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-secondary">Badges with Leading/Trailing Icons</h2>
          
          <div className="flex flex-wrap gap-2">
            <Badge 
              size="sm" 
              color="gray"
              iconLeading={Clock01Icon}
            >
              12 months
            </Badge>
            
            <Badge 
              size="sm" 
              color="success"
              iconLeading={Tick01Icon}
            >
              Completed
            </Badge>
            
            <Badge 
              size="sm" 
              color="warning"
              iconTrailing={Alert01Icon}
            >
              Pending
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-secondary">Mixed Content Test</h2>
          
          <div className="flex flex-wrap gap-2">
            <Badge size="sm" color="gray">
              Text Only
            </Badge>
            
            <Badge size="sm" color="gray" dot>
              With Dot
            </Badge>
            
            <Badge size="sm" color="gray">
              <span>Multiple</span>
              <span>Children</span>
              <span>Test</span>
            </Badge>
            
            <Badge size="sm" color="gray">
              Text
              <HugeIcon icon={Clock01Icon} size={12} className="text-tertiary/50" strokeWidth={2.5} />
              More Text
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}