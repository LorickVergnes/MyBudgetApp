import {
  Wallet, CreditCard, PiggyBank, Home, Car,
  ShoppingCart, Coffee, Utensils, Zap, Phone, Computer, Gift, Heart, User, Users,
  Briefcase, Camera, Music, Video, MapPin, Navigation, Compass, Star, Sun, Moon,
  Cloud, Snowflake, Plane, Ship, Anchor, Bike, Dumbbell, Activity, HeartPulse,
  GraduationCap, BookOpen, Edit3, Image, Monitor, Smartphone, Watch, Headphones,
  Speaker, Battery, Plug, Cpu, Tv, Printer, Shield, Flag, Bookmark, CheckCircle,
  PlusCircle, AlertCircle, HelpCircle, Info, Coins, Landmark, Receipt, Ticket, Target, TrendingUp, Gem
} from 'lucide-react';

export const ICON_REGISTRY = {
  Wallet, CreditCard, PiggyBank, Home, Car,
  ShoppingCart, Coffee, Utensils, Zap, Phone, Computer, Gift, Heart, User, Users,
  Briefcase, Camera, Music, Video, MapPin, Navigation, Compass, Star, Sun, Moon,
  Cloud, Snowflake, Plane, Ship, Anchor, Bike, Dumbbell, Activity, HeartPulse,
  GraduationCap, BookOpen, Edit3, Image, Monitor, Smartphone, Watch, Headphones,
  Speaker, Battery, Plug, Cpu, Tv, Printer, Shield, Flag, Bookmark, CheckCircle,
  PlusCircle, AlertCircle, HelpCircle, Info, Coins, Landmark, Receipt, Ticket, Target, TrendingUp, Gem
};

export const QUICK_ICONS = ['Wallet', 'CreditCard', 'PiggyBank', 'Home', 'Car'];

export const ALL_ICON_KEYS = Object.keys(ICON_REGISTRY);

export const getIconComponent = (key) => {
  return ICON_REGISTRY[key] || HelpCircle;
};
