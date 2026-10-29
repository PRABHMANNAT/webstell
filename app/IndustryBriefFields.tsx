'use client';

import { useId, useState } from 'react';
import { Select } from '@base-ui/react/select';
import { Check, ChevronDown, Layers } from 'lucide-react';
import { enquiryServices } from './enquiry-services';

const serviceGroups = [
  { label: 'Websites & design', indexes: [0, 1, 2, 15] },
  { label: 'Software & AI', indexes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  { label: 'Growth & support', indexes: [14, 16, 17] },
];
const serviceItems = enquiryServices.map((service) => ({
  label: service,
  value: service,
}));

export default function IndustryBriefFields() {
  const id = useId();
  const [service, setService] = useState<string | null>(null);
  const [brief, setBrief] = useState('');

  return (
    <>
      <div className="industry-brief-field">
        <label id={`${id}-service-label`} htmlFor={`${id}-service`}>
          What would you like to build?
        </label>
        <Select.Root
          name="project"
          value={service}
          onValueChange={setService}
          items={serviceItems}
          required
        >
          <Select.Trigger
            id={`${id}-service`}
            aria-labelledby={`${id}-service-label`}
            className="industry-service-trigger"
          >
            <span className="industry-service-glyph" aria-hidden="true">
              <Layers size={20} strokeWidth={1.5} />
            </span>
            <Select.Value
              className="industry-service-value"
              placeholder="Choose a service"
            />
            <Select.Icon className="industry-service-chevron">
              <ChevronDown size={18} aria-hidden="true" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner
              sideOffset={8}
              align="start"
              alignItemWithTrigger={false}
              className="industry-service-positioner"
            >
              <Select.Popup className="industry-service-popup">
                <Select.List>
                  {serviceGroups.map((group) => (
                    <Select.Group
                      key={group.label}
                      className="industry-service-group"
                    >
                      <Select.GroupLabel className="industry-service-group-label">
                        {group.label}
                      </Select.GroupLabel>
                      {group.indexes.map((index) => (
                        <Select.Item
                          key={enquiryServices[index]}
                          value={enquiryServices[index]}
                          className="industry-service-option"
                        >
                          <Select.ItemText>
                            {enquiryServices[index]}
                          </Select.ItemText>
                          <Select.ItemIndicator>
                            <Check size={16} aria-hidden="true" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        <small className="industry-brief-hint">
          Choose the closest match, or select Other.
        </small>
      </div>
      <div className="industry-brief-field">
        <label htmlFor={`${id}-brief`}>Tell us your idea</label>
        <div className="industry-brief-editor">
          <textarea
            id={`${id}-brief`}
            name="detail"
            value={brief}
            onChange={(event) => setBrief(event.target.value)}
            rows={4}
            required
            minLength={12}
            maxLength={600}
            placeholder="What should it do, and who is it for?"
            aria-describedby={`${id}-hint`}
          />
          <div className="industry-editor-meta">
            <span id={`${id}-hint`}>A few sentences is enough.</span>
            <span aria-hidden="true">{brief.length} / 600</span>
          </div>
        </div>
      </div>
    </>
  );
}
