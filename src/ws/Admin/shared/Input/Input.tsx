import isEqual from 'lodash/isEqual'
import { useId, useState } from 'react'
import type { ChangeEvent } from 'react'

import { CONSTANTS } from '../../../../helpers/constants'
import './Input.css'

const SIMPLE_TYPES = ['text', 'email', 'number', 'tel', 'url'];
const IMAGE_TYPES = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];

interface InputProps {
    accept?: string;
    label?: string;
    inputType?: string;
    placeholder?: string;
    errorMessage?: string;
    error?: boolean;
    onChange?: (value: string) => void;
    onCheckedChange?: (checked: boolean) => void;
    value?: string;
    checked?: boolean;
    onFileChange?: (file: File | null) => void;
}

/**
 * @description Generates a customizable input component that supports text, password, textarea, and checkbox types.
 * @param {string} label - The label for the input field.
 * @param {string} inputType - The type of the input field (text, password, textarea, checkbox, etc.).
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} errorMessage - The error message to display when the input is invalid.
 * @param {boolean} error - Indicates whether the input has an error.
 * @param {function} onChange - Callback function to handle changes in the input value.
 * @param {function} onCheckedChange - Callback function to handle changes in the checkbox state.
*/
const Input = ({ accept, label, inputType, placeholder, errorMessage, error, onChange, onCheckedChange, value, checked, onFileChange }: InputProps) => {
    const [hasError, setHasError] = useState(false);
    const [fileName, setFileName] = useState(CONSTANTS.EMPTY_STRING);
    const [showPassword, setShowPassword] = useState(false);
    const checkboxId = useId();
    const resolvedPlaceholder = placeholder ? placeholder : CONSTANTS.EMPTY_STRING;

    const validateInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setHasError(isEqual(value, CONSTANTS.EMPTY_STRING));
        onChange?.(value);
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        onCheckedChange?.(e.target.checked);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && !IMAGE_TYPES.includes(file.type)) {
            e.target.value = CONSTANTS.EMPTY_STRING;
            setFileName(CONSTANTS.EMPTY_STRING);
            setHasError(true);
            onFileChange?.(null);
            return;
        }

        setFileName(file?.name ?? CONSTANTS.EMPTY_STRING);
        setHasError(false);
        onFileChange?.(file);
    }

    const showError = hasError || error;
    const errorText = errorMessage ? errorMessage : CONSTANTS.ERROR_MESSAGE;

    if (inputType === 'checkbox') {
        return (
            <div className="input-container mb-3">
                <div className="checkbox-wrapper form-check">
                    <input checked={checked} className="form-check-input" onChange={handleCheckboxChange} type="checkbox" id={checkboxId} />
                    <label className="form-check-label checkbox-label" htmlFor={checkboxId}>
                        {label ? label : CONSTANTS.EMPTY_STRING}
                    </label>
                </div>
                {showError && <small className="text-danger">{errorText}</small>}
            </div>
        );
    }

    const renderField = () => {
        if (inputType === 'password') {
            return (
                <div className="input-group">
                    <input className="form-control" onChange={validateInput} type={showPassword ? 'text' : 'password'} placeholder={resolvedPlaceholder} value={value} />
                    <button className="btn show-button" type="button" onClick={() => setShowPassword(!showPassword)}>
                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                    </button>
                </div>
            );
        }

        if (inputType === 'textarea') {
            return <textarea className="form-control" onChange={validateInput} rows={4} placeholder={resolvedPlaceholder} value={value}></textarea>;
        }

        if (inputType === 'file') {
            return (
                <div className="file-input-group">
                    <input accept={accept} className="visually-hidden" id={checkboxId} onChange={handleFileChange} type="file" />
                    <label className="btn file-select-button" htmlFor={checkboxId}>Choose file</label>
                    <span className="file-name">{fileName || 'No file selected'}</span>
                </div>
            );
        }

        const type = SIMPLE_TYPES.includes(inputType ?? '') ? inputType : 'text';
        return <input className="form-control" onChange={validateInput} type={type} placeholder={resolvedPlaceholder} value={value} />;
    };

    return (
        <div className="input-container mb-3">
            <label className="form-label">
                {label ? label : CONSTANTS.EMPTY_STRING}
            </label>
            {renderField()}
            {showError && <small className="text-danger">{errorText}</small>}
        </div>
    )
}

export default Input;