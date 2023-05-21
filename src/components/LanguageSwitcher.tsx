interface LanguageSwitcherProps {
  lang: string;
  onSwitchLang: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  locales: string[];
}

const LanguageSwitcher = ({
  lang,
  onSwitchLang,
  locales,
}: LanguageSwitcherProps) => {
  return (
    <select
      className="mx-4 rounded border-2 border-white bg-gray-900 p-1"
      value={lang}
      onChange={(e) => onSwitchLang(e)}
    >
      {[...(locales as string[])].sort().map((locale) => (
        <option value={locale} key={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
