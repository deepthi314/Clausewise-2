import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from './ui/Button';

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'हिंदी' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'bn', label: 'বাংলা' }
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-500" />
            <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-white border border-slate-300 text-slate-700 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block p-2"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSwitcher;
