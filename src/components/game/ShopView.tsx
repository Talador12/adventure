// ShopView — buy/sell interface extracted from Game.tsx.
// Displays merchant inventory, category filters, buy/sell buttons, and gold counter.
import { type Character, type Item, SHOP_ITEMS, SHOP_CATEGORIES, RARITY_COLORS, RARITY_BG, useGame } from '../../contexts/GameContext';
import { useState } from 'react';

interface ShopViewProps {
  selectedCharacter: Character | null;
  shopMessage: string | null;
  setShopMessage: (v: string | null) => void;
}

export default function ShopView({ selectedCharacter, shopMessage, setShopMessage }: ShopViewProps) {
  const { buyItem, sellItem } = useGame();
  const [shopCategory, setShopCategory] = useState<string>(SHOP_CATEGORIES[0]);

  if (!selectedCharacter) {
    return <div className="flex items-center justify-center h-full text-slate-600 text-sm">Select a character to shop</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Shop header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-yellow-400">Merchant&apos;s Wares</h3>
          <p className="text-[10px] text-slate-500">Buy gear and sell unwanted items</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-black text-yellow-400">{selectedCharacter.gold}g</div>
          <div className="text-[9px] text-slate-500">Your gold</div>
        </div>
      </div>

      {/* Shop message toast */}
      {shopMessage && <div className="text-xs text-center py-1.5 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 animate-pulse">{shopMessage}</div>}

      {/* Category tabs */}
      <div className="flex gap-1">
        {SHOP_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setShopCategory(cat)} className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-all ${shopCategory === cat ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items for sale */}
      <div className="space-y-1.5">
        {SHOP_ITEMS.filter((i) => i.category === shopCategory).map((shopItem, idx) => {
          const canAfford = selectedCharacter.gold >= shopItem.value;
          return (
            <div key={idx} className={`flex items-center gap-2 rounded-lg border ${RARITY_BG[shopItem.rarity]} bg-slate-800/30 px-3 py-2`}>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold ${RARITY_COLORS[shopItem.rarity]}`}>{shopItem.name}</div>
                <div className="text-[9px] text-slate-500">{shopItem.description}</div>
              </div>
              <div className="text-xs font-bold text-yellow-400 shrink-0">{shopItem.value}g</div>
              <button
                onClick={() => {
                  const { category: _, ...item } = shopItem;
                  const result = buyItem(selectedCharacter.id, item);
                  setShopMessage(result.message);
                  setTimeout(() => setShopMessage(null), 2500);
                }}
                disabled={!canAfford}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-yellow-900/30 border border-yellow-700/40 text-yellow-400 hover:bg-yellow-900/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
              >
                Buy
              </button>
            </div>
          );
        })}
      </div>

      {/* Sell section */}
      <div className="border-t border-slate-800 pt-4">
        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Sell Items (50% value)</h4>
        {(selectedCharacter.inventory || []).length === 0 ? (
          <div className="text-[10px] text-slate-600 italic text-center py-2">No items to sell</div>
        ) : (
          <div className="space-y-1">
            {(selectedCharacter.inventory || []).map((item: Item) => {
              const sellPrice = Math.max(1, Math.floor(item.value / 2));
              return (
                <div key={item.id} className="flex items-center gap-2 rounded-lg bg-slate-800/30 border border-slate-700/50 px-3 py-1.5">
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold ${RARITY_COLORS[item.rarity]}`}>{item.name}</span>
                    {item.quantity && item.quantity > 1 && <span className="text-slate-500 text-xs ml-1">&times;{item.quantity}</span>}
                  </div>
                  <div className="text-xs text-yellow-600 shrink-0">+{sellPrice}g</div>
                  <button
                    onClick={() => {
                      const result = sellItem(selectedCharacter.id, item.id);
                      setShopMessage(result.message);
                      setTimeout(() => setShopMessage(null), 2500);
                    }}
                    className="px-2 py-0.5 text-[10px] font-semibold rounded-lg text-red-400 hover:bg-red-900/30 border border-red-800/30 transition-all shrink-0"
                  >
                    Sell
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
