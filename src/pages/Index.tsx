import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [balance, setBalance] = useState(12500);
  const [level, setLevel] = useState(7);
  const [xp, setXp] = useState(450);
  const [activeTab, setActiveTab] = useState('cases');

  const cases = [
    { id: 1, name: 'Neon Dreams', price: 250, rarity: 'legendary', color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'Cyber Strike', price: 180, rarity: 'epic', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Digital Wave', price: 120, rarity: 'rare', color: 'from-cyan-400 to-blue-600' },
    { id: 4, name: 'Pulse Core', price: 320, rarity: 'legendary', color: 'from-violet-500 to-purple-600' },
    { id: 5, name: 'Tech Fusion', price: 90, rarity: 'common', color: 'from-gray-500 to-gray-600' },
    { id: 6, name: 'Quantum Shift', price: 450, rarity: 'mythic', color: 'from-pink-500 to-orange-500' },
  ];

  const battlePassRewards = [
    { level: 1, reward: '500 FarmSo2', unlocked: true },
    { level: 2, reward: 'Neon Skin', unlocked: true },
    { level: 3, reward: '1000 FarmSo2', unlocked: true },
    { level: 4, reward: 'Epic Case', unlocked: true },
    { level: 5, reward: 'Rare Weapon', unlocked: true },
    { level: 6, reward: '1500 FarmSo2', unlocked: true },
    { level: 7, reward: 'Cyber Avatar', unlocked: true },
    { level: 8, reward: '2000 FarmSo2', unlocked: false },
    { level: 9, reward: 'Legendary Skin', unlocked: false },
    { level: 10, reward: '5000 FarmSo2', unlocked: false },
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'cases', label: 'Кейсы', icon: 'Package' },
    { id: 'skins', label: 'Скины', icon: 'Sparkles' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
    { id: 'inventory', label: 'Инвентарь', icon: 'Archive' },
    { id: 'leaderboard', label: 'Рейтинг', icon: 'Trophy' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'text-orange-400';
      case 'legendary': return 'text-purple-400';
      case 'epic': return 'text-blue-400';
      case 'rare': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const openCase = (caseItem: typeof cases[0]) => {
    if (balance >= caseItem.price) {
      setBalance(balance - caseItem.price);
      setXp(xp + 50);
      if (xp + 50 >= 500) {
        setLevel(level + 1);
        setXp((xp + 50) - 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold gradient-cyber bg-clip-text text-transparent">
                FARMSO2
              </h1>
              <div className="hidden md:flex gap-4">
                {navItems.slice(0, 5).map(item => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? 'default' : 'ghost'}
                    onClick={() => setActiveTab(item.id)}
                    className="gap-2"
                  >
                    <Icon name={item.icon as any} size={16} />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-lg border border-primary neon-glow">
                <Icon name="Wallet" size={20} className="text-primary" />
                <span className="font-bold text-lg">{balance.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">FarmSo2</span>
              </div>
              <Button variant="outline" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-8 border border-primary/30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 text-neon">Открывай кейсы и получай редкие скины!</h2>
              <p className="text-lg text-muted-foreground mb-6">Собери коллекцию легендарных предметов и стань лучшим игроком</p>
              <div className="flex gap-4">
                <Button size="lg" className="neon-glow">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать игру
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="Info" size={20} className="mr-2" />
                  Как играть
                </Button>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Zap" className="text-primary" />
                Боевой пропуск
                <Badge className="ml-2 neon-glow-purple">Уровень {level}</Badge>
              </h3>
            </div>
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Прогресс до уровня {level + 1}</span>
                  <span className="text-primary font-bold">{xp} / 500 XP</span>
                </div>
                <Progress value={(xp / 500) * 100} className="h-3" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {battlePassRewards.map((reward) => (
                  <Card
                    key={reward.level}
                    className={`p-4 text-center transition-all ${
                      reward.unlocked
                        ? 'bg-primary/20 border-primary neon-glow'
                        : 'bg-muted/20 border-muted opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {reward.unlocked ? '🏆' : '🔒'}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">Уровень {reward.level}</div>
                    <div className="text-sm font-semibold">{reward.reward}</div>
                  </Card>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Package" className="text-secondary" />
                Доступные кейсы
              </h3>
              <Button variant="outline">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="group overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer bg-card/50 backdrop-blur border-primary/20 hover:border-primary"
                >
                  <div className={`h-48 bg-gradient-to-br ${caseItem.color} relative flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 text-6xl animate-float">📦</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{caseItem.name}</h4>
                      <Badge className={getRarityColor(caseItem.rarity)}>
                        {caseItem.rarity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Coins" size={16} className="text-primary" />
                        <span className="font-bold text-primary">{caseItem.price}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => openCase(caseItem)}
                        disabled={balance < caseItem.price}
                        className="neon-glow"
                      >
                        Открыть
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
