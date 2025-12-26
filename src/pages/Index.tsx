import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Skin {
  id: number;
  name: string;
  rarity: string;
  price: number;
  image: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(50);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [activeTab, setActiveTab] = useState('cases');
  const [inventory, setInventory] = useState<Skin[]>([]);
  const [showCaseAnimation, setShowCaseAnimation] = useState(false);
  const [rouletteItems, setRouletteItems] = useState<Skin[]>([]);
  const [wonSkin, setWonSkin] = useState<Skin | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const standoffSkins = [
    { id: 1, name: 'AK-47 | Redline', rarity: 'legendary', image: '🔫' },
    { id: 2, name: 'M4A1 | Cyrex', rarity: 'epic', image: '🔫' },
    { id: 3, name: 'AWP | Dragon Lore', rarity: 'mythic', image: '🎯' },
    { id: 4, name: 'USP | Kill Confirmed', rarity: 'rare', image: '🔫' },
    { id: 5, name: 'Glock | Fade', rarity: 'epic', image: '🔫' },
    { id: 6, name: 'Knife | Karambit', rarity: 'mythic', image: '🔪' },
    { id: 7, name: 'Desert Eagle | Blaze', rarity: 'legendary', image: '🔫' },
    { id: 8, name: 'P90 | Asiimov', rarity: 'rare', image: '🔫' },
    { id: 9, name: 'M4A4 | Howl', rarity: 'mythic', image: '🔫' },
    { id: 10, name: 'AK-47 | Fire Serpent', rarity: 'legendary', image: '🔫' },
  ];

  const cases = [
    { id: 1, name: 'Starter Case', price: 19, rarity: 'common', color: 'from-gray-500 to-gray-600', skins: [1, 2, 4, 8] },
    { id: 2, name: 'Elite Case', price: 150, rarity: 'rare', color: 'from-cyan-400 to-blue-600', skins: [2, 5, 7, 8] },
    { id: 3, name: 'Legendary Case', price: 500, rarity: 'epic', color: 'from-blue-500 to-cyan-500', skins: [1, 3, 5, 7, 10] },
    { id: 4, name: 'Supreme Case', price: 1200, rarity: 'legendary', color: 'from-purple-500 to-pink-500', skins: [3, 6, 7, 9, 10] },
    { id: 5, name: 'Ultra Rare Case', price: 3500, rarity: 'mythic', color: 'from-pink-500 to-orange-500', skins: [3, 6, 9, 10] },
    { id: 6, name: 'God Tier Case', price: 10000, rarity: 'mythic', color: 'from-yellow-500 to-red-500', skins: [3, 6, 9] },
  ];

  const battlePassRewards = [
    { level: 1, reward: '50 FarmSo2', unlocked: true },
    { level: 2, reward: 'Starter Case', unlocked: false },
    { level: 3, reward: '100 FarmSo2', unlocked: false },
    { level: 4, reward: 'Elite Case', unlocked: false },
    { level: 5, reward: '200 FarmSo2', unlocked: false },
    { level: 6, reward: 'Rare Skin', unlocked: false },
    { level: 7, reward: '300 FarmSo2', unlocked: false },
    { level: 8, reward: 'Legendary Case', unlocked: false },
    { level: 9, reward: '500 FarmSo2', unlocked: false },
    { level: 10, reward: 'Knife Skin', unlocked: false },
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'cases', label: 'Кейсы', icon: 'Package' },
    { id: 'inventory', label: 'Инвентарь', icon: 'Archive' },
    { id: 'shop', label: 'Магазин', icon: 'ShoppingBag' },
    { id: 'leaderboard', label: 'Рейтинг', icon: 'Trophy' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'text-orange-400 border-orange-400';
      case 'legendary': return 'text-purple-400 border-purple-400';
      case 'epic': return 'text-blue-400 border-blue-400';
      case 'rare': return 'text-cyan-400 border-cyan-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'bg-orange-500/20';
      case 'legendary': return 'bg-purple-500/20';
      case 'epic': return 'bg-blue-500/20';
      case 'rare': return 'bg-cyan-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsLoggedIn(true);
    setShowAuthDialog(false);
  };

  const generateRandomPrice = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return Math.floor(Math.random() * (5000 - 1000) + 1000);
      case 'legendary': return Math.floor(Math.random() * (1000 - 300) + 300);
      case 'epic': return Math.floor(Math.random() * (300 - 100) + 100);
      case 'rare': return Math.floor(Math.random() * (100 - 30) + 30);
      default: return Math.floor(Math.random() * (30 - 10) + 10);
    }
  };

  const openCase = (caseItem: typeof cases[0]) => {
    if (balance < caseItem.price) return;

    setBalance(balance - caseItem.price);
    
    const caseSkinsData = caseItem.skins.map(skinId => {
      const skin = standoffSkins.find(s => s.id === skinId)!;
      return {
        ...skin,
        price: generateRandomPrice(skin.rarity)
      };
    });

    const allRouletteSkins: Skin[] = [];
    for (let i = 0; i < 50; i++) {
      const randomSkin = caseSkinsData[Math.floor(Math.random() * caseSkinsData.length)];
      allRouletteSkins.push({
        ...randomSkin,
        id: randomSkin.id + i * 1000,
        price: generateRandomPrice(randomSkin.rarity)
      });
    }

    const winnerIndex = Math.floor(Math.random() * caseSkinsData.length);
    const winner = caseSkinsData[winnerIndex];
    allRouletteSkins[45] = winner;

    setRouletteItems(allRouletteSkins);
    setWonSkin(winner);
    setShowCaseAnimation(true);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setInventory([...inventory, winner]);
      setXp(xp + 50);
      if (xp + 50 >= 500) {
        setLevel(level + 1);
        setXp((xp + 50) - 500);
      }
    }, 5000);
  };

  const sellSkin = (skin: Skin) => {
    setInventory(inventory.filter(s => s.id !== skin.id));
    setBalance(balance + skin.price);
  };

  if (!isLoggedIn) {
    return (
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-cyber bg-clip-text text-transparent">
              Добро пожаловать в FARMSO2
            </DialogTitle>
            <DialogDescription>
              Войдите или зарегистрируйтесь, чтобы начать открывать кейсы
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Имя пользователя</Label>
                <Input
                  id="username"
                  placeholder="Введите имя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="Введите пароль" />
              </div>
              <Button
                className="w-full neon-glow"
                onClick={() => handleLogin(username || 'Player')}
                disabled={!username}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-username">Имя пользователя</Label>
                <Input
                  id="reg-username"
                  placeholder="Придумайте имя"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="example@mail.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Пароль</Label>
                <Input id="reg-password" type="password" placeholder="Придумайте пароль" />
              </div>
              <Button
                className="w-full neon-glow"
                onClick={() => handleLogin(username || 'Player')}
                disabled={!username}
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Зарегистрироваться
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Dialog open={showCaseAnimation} onOpenChange={setShowCaseAnimation}>
        <DialogContent className="sm:max-w-4xl bg-card/95 backdrop-blur border-primary/30">
          <div className="space-y-6">
            <div className="relative h-64 overflow-hidden rounded-lg border-2 border-primary">
              <div className="absolute top-1/2 left-1/2 w-1 h-full bg-primary z-20 transform -translate-x-1/2"></div>
              <div
                className={`flex gap-4 py-20 transition-transform duration-[5000ms] ${
                  isSpinning ? 'ease-out' : ''
                }`}
                style={{
                  transform: isSpinning ? `translateX(-${45 * 160}px)` : 'translateX(0)',
                }}
              >
                {rouletteItems.map((skin, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-36 h-48 ${getRarityBg(skin.rarity)} rounded-lg border-2 ${getRarityColor(
                      skin.rarity
                    )} flex flex-col items-center justify-center p-4`}
                  >
                    <div className="text-4xl mb-2">{skin.image}</div>
                    <div className="text-xs text-center font-semibold">{skin.name}</div>
                  </div>
                ))}
              </div>
            </div>
            {!isSpinning && wonSkin && (
              <div className="text-center space-y-4 animate-fade-in">
                <h3 className="text-2xl font-bold text-primary">Поздравляем!</h3>
                <p className="text-lg">Вы получили:</p>
                <div className={`inline-block ${getRarityBg(wonSkin.rarity)} rounded-lg border-2 ${getRarityColor(wonSkin.rarity)} p-6`}>
                  <div className="text-6xl mb-4">{wonSkin.image}</div>
                  <div className="font-bold text-xl">{wonSkin.name}</div>
                  <div className="text-primary text-lg mt-2">{wonSkin.price} FarmSo2</div>
                </div>
                <Button onClick={() => setShowCaseAnimation(false)} className="neon-glow">
                  Забрать в инвентарь
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold gradient-cyber bg-clip-text text-transparent">
                FARMSO2
              </h1>
              <div className="hidden md:flex gap-4">
                {navItems.map(item => (
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
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/20 rounded-lg border border-secondary">
                <Icon name="User" size={18} className="text-secondary" />
                <span className="text-sm font-semibold">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {activeTab === 'home' && (
            <>
              <section className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-8 border border-primary/30">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold mb-4 text-neon">Открывай кейсы и получай редкие скины!</h2>
                  <p className="text-lg text-muted-foreground mb-6">Собери коллекцию легендарных предметов из Standoff 2</p>
                  <div className="flex gap-4">
                    <Button size="lg" className="neon-glow" onClick={() => setActiveTab('cases')}>
                      <Icon name="Play" size={20} className="mr-2" />
                      Открыть кейсы
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => setActiveTab('inventory')}>
                      <Icon name="Archive" size={20} className="mr-2" />
                      Мой инвентарь
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
                          level >= reward.level
                            ? 'bg-primary/20 border-primary neon-glow'
                            : 'bg-muted/20 border-muted opacity-50'
                        }`}
                      >
                        <div className="text-2xl mb-2">
                          {level >= reward.level ? '🏆' : '🔒'}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">Уровень {reward.level}</div>
                        <div className="text-sm font-semibold">{reward.reward}</div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </section>
            </>
          )}

          {activeTab === 'cases' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Package" className="text-secondary" />
                  Доступные кейсы
                </h3>
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
          )}

          {activeTab === 'inventory' && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Archive" className="text-secondary" />
                  Мой инвентарь
                  <Badge>{inventory.length} предметов</Badge>
                </h3>
              </div>
              {inventory.length === 0 ? (
                <Card className="p-12 text-center bg-card/50 backdrop-blur">
                  <Icon name="Package" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground mb-4">Ваш инвентарь пуст</p>
                  <Button onClick={() => setActiveTab('cases')} className="neon-glow">
                    <Icon name="Package" size={16} className="mr-2" />
                    Открыть кейс
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {inventory.map((skin) => (
                    <Card
                      key={skin.id}
                      className={`p-4 ${getRarityBg(skin.rarity)} border-2 ${getRarityColor(skin.rarity)} hover:scale-105 transition-all`}
                    >
                      <div className="text-5xl text-center mb-3">{skin.image}</div>
                      <h4 className="font-bold text-center mb-2 text-sm">{skin.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="text-primary font-bold">{skin.price}</div>
                        <Button size="sm" variant="destructive" onClick={() => sellSkin(skin)}>
                          <Icon name="DollarSign" size={14} className="mr-1" />
                          Продать
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
