import React, { useState } from 'react'

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'PT', name: 'Português', flag: '🇵🇹' },
    { code: 'JA', name: '日本語', flag: '🇯🇵' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' }
  ]

  const selectedLang = languages.find(lang => lang.code === selectedLanguage)

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode)
    setIsLanguageDropdownOpen(false)
  }

  const handleShopNow = () => {
    console.log('Shop Now clicked')
  }

  return (
    <header className="bg-white shadow-md top-0 z-50">
      {/* Promotional Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Promotional Message */}
            <div className="flex items-center space-x-4">
              <span className="text-center flex-1">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
              </span>
              <button 
                onClick={handleShopNow}
                className="font-bold underline hover:text-yellow-300 cursor-pointer transition-colors duration-200"
              >
                ShopNow
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1 text-white hover:bg-gray-700 rounded transition-colors duration-200"
              >
                <span className="text-sm">{selectedLang?.flag}</span>
                <span className="text-sm font-medium">{selectedLang?.code}</span>
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                          selectedLanguage === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{language.flag}</span>
                        <span>{language.name}</span>
                        <span className="text-xs text-gray-500">({language.code})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header