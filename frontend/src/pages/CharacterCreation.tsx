import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';

interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  personality_traits: string[];
  backstory: string;
}

export default function CharacterCreation() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // LLM settings with defaults
  const [temperature, setTemperature] = useState(2);
  const [topP, setTopP] = useState(0.9);
  const [model, setModel] = useState('@cf/meta/llama-4-scout-17b-16e-instruct');

  const generateCharacter = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/character/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          temperature,
          top_p: topP,
          model,
        }),
      });

      const data = await response.json();

      if (data.success && data.character?.response) {
        const characterData = data.character.response;

        // Validate that the response has the required fields
        if (!characterData.name || !characterData.race || !characterData.class) {
          setError('Invalid character data received. Please try again.');
          return;
        }

        // Ensure personality_traits is an array
        if (!Array.isArray(characterData.personality_traits)) {
          setError('Invalid character data received. Please try again.');
          return;
        }

        setCharacter(characterData);
      } else {
        setError(data.error || 'Failed to generate character. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while generating the character. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-6xl text-amber-400 mb-4">
            Character Creation
          </h1>
          <p className="text-stone-300 text-lg">
            Generate a unique fantasy RPG character powered by AI
          </p>
        </motion.div>

        {/* Settings Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            {showSettings ? '▼' : '▶'} Advanced Settings
          </button>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-stone-800 border-2 border-amber-600/30 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-display text-xl text-amber-400 mb-4">
                  Model Settings
                </h3>
                <div className="space-y-4">
                  {/* Model Selection */}
                  <div>
                    <label className="block text-stone-300 mb-2">
                      Model
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-stone-700 border-2 border-stone-600 rounded-lg px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="@cf/meta/llama-4-scout-17b-16e-instruct">
                        Llama 4 Scout 17B (16e Instruct)
                      </option>
                      <option value="@cf/meta/llama-3.1-8b-instruct">
                        Llama 3.1 8B Instruct
                      </option>
                      <option value="@cf/meta/llama-3.3-70b-instruct-fp8-fast">
                        Llama 3.3 70B Instruct
                      </option>
                    </select>
                  </div>

                  {/* Temperature */}
                  <div>
                    <label className="block text-stone-300 mb-2">
                      Temperature: {temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <p className="text-stone-400 text-sm mt-1">
                      Controls randomness (0 = focused, 2 = creative)
                    </p>
                  </div>

                  {/* Top P */}
                  <div>
                    <label className="block text-stone-300 mb-2">
                      Top P: {topP}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={topP}
                      onChange={(e) => setTopP(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <p className="text-stone-400 text-sm mt-1">
                      Controls diversity of word choices
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={generateCharacter}
            disabled={loading}
            className="px-8 py-4 text-xl"
          >
            {loading ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-900/50 border-2 border-red-500 rounded-lg p-4 mb-8 text-center"
          >
            <p className="text-red-200">{error}</p>
          </motion.div>
        )}

        {/* Character Display */}
        <AnimatePresence mode="wait">
          {character && (
            <motion.div
              key={character.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-stone-800 to-stone-900 border-4 border-amber-600 rounded-xl p-8 shadow-2xl"
            >
              {/* Character Name */}
              <div className="text-center mb-6 border-b-2 border-amber-600 pb-4">
                <h2 className="font-display text-5xl text-amber-400 mb-2">
                  {character.name}
                </h2>
                <p className="text-stone-400 text-lg">
                  Level {character.level} {character.race} {character.class}
                </p>
              </div>

              {/* Character Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <StatCard label="Race" value={character.race} />
                <StatCard label="Class" value={character.class} />
                <StatCard label="Background" value={character.background} />
                <StatCard label="Alignment" value={character.alignment} />
              </div>

              {/* Personality Traits */}
              <div className="mb-8">
                <h3 className="font-display text-2xl text-amber-400 mb-4">
                  Personality Traits
                </h3>
                <div className="space-y-2">
                  {character.personality_traits.map((trait, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-stone-700/50 rounded-lg p-3 border-l-4 border-amber-500"
                    >
                      <p className="text-stone-200">{trait}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Backstory */}
              <div>
                <h3 className="font-display text-2xl text-amber-400 mb-4">
                  Backstory
                </h3>
                <div className="bg-stone-700/50 rounded-lg p-6 border-2 border-amber-600/30">
                  <p className="text-stone-200 leading-relaxed text-lg">
                    {character.backstory}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full mb-4"
            />
            <p className="text-amber-400 text-xl font-display">
              Summoning your character...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-stone-700/50 rounded-lg p-4 border-2 border-amber-600/30 hover:border-amber-500 transition-colors">
      <p className="text-stone-400 text-sm font-semibold mb-1">{label}</p>
      <p className="text-amber-300 text-xl font-display">{value}</p>
    </div>
  );
}
