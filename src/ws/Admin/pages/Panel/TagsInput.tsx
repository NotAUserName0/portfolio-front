import { useState } from 'react';
import isEqual from 'lodash/isEqual';
import Input from '../../shared/Input/Input';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const parseTags = (val: string): string[] =>
  val
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

export const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const [text, setText] = useState((value || []).join(', '));
  const [lastEmitted, setLastEmitted] = useState(value || []);

  const normalizedValue = value || [];
  if (!isEqual(normalizedValue, lastEmitted)) {
    setLastEmitted(normalizedValue);
    setText(normalizedValue.join(', '));
  }

  const handleChange = (val: string) => {
    setText(val);
    const parsed = parseTags(val);
    setLastEmitted(parsed);
    onChange(parsed);
  };

  return (
    <Input
      label="Tags"
      placeholder="React, TypeScript, CSS"
      value={text}
      onChange={handleChange}
    />
  );
};