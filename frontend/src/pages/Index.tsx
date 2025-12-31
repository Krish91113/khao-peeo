import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed,
  Clock,
  TrendingUp,
  Shield,
  Check,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Users,
  BarChart3,
  Smartphone,
  Headphones,
  Zap,
  Receipt,
  Star,
  IndianRupee,
  Printer,
  ChefHat,
  QrCode,
  Plus,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ScrollBaseAnimation from "@/components/ui/scroll-text-marquee";

// Restaurant data for the trusted section
const trustedRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    location: "Airoli",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyVYnPD6_UueyH5WC6ZSaENPykAhWjbGc_3kKCQ4WTh0HbeqhDM9W0DcD_vMAjMY_oratTmVVykeQVu5e5OLeBkdEKAZNB6KyrRj8eqen7pdD7IJEhABiblDDWqhIe26Xk5J1pE=s1360-w1360-h1020-rw",
    rating: 4.8
  },
  {
    id: 2,
    name: "The Coastal Kitchen",
    location: "Koparkhairane",
    image: "https://content.jdmagicbox.com/v2/comp/thane/r9/022pxx22.xx22.180215120804.j2r9/catalogue/coastal-kitchen-mira-road-thane-home-delivery-restaurants-9o9dt.jpg",
    rating: 4.9
  },
  {
    id: 3,
    name: "Mumbai Masala House",
    location: "Airoli",
    image: "https://content.jdmagicbox.com/v2/comp/bikaner/j7/9999px151.x151.200927134521.x3j7/catalogue/mumbai-masala-jai-narayan-vyas-colony-bikaner-restaurants-bb3vgtniut.jpg",
    rating: 4.7
  },
  {
    id: 4,
    name: "Green Leaf Bistro",
    location: "Koparkhairane",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-c_hJwEkC5d-7PN1x8RO0e1vPz0bbrz_MA&s",
    rating: 4.6
  },
  {
    id: 5,
    name: "Royal Punjab Dhaba",
    location: "Airoli",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZBGS-7Nkoxw7duCHYIDYCwOGIdCKqsPR3fA&s",
    rating: 4.8
  },
  {
    id: 6,
    name: "Saffron Tales",
    location: "Koparkhairane",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqktOBrdMcBvUpDnvXONrcOoWaXa7fY9y5wQ&s",
    rating: 4.9
  },
  {
    id: 7,
    name: "The Italian Corner",
    location: "Airoli",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y5POb4FIKxWmHHiZCo1Zck2oNRM8uY24Ww&s",
    rating: 4.5
  },
  {
    id: 8,
    name: "Dragon Wok",
    location: "Koparkhairane",
    image: "data:image/jpeg;base64,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",
    rating: 4.7
  }
];

// Infinite scrolling restaurant cards
const TrustedRestaurantsCarousel = () => {
  const duplicatedRestaurants = [...trustedRestaurants, ...trustedRestaurants, ...trustedRestaurants];

  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -288 * trustedRestaurants.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicatedRestaurants.map((restaurant, index) => (
          <div
            key={`${restaurant.id}-${index}`}
            className="flex-shrink-0 w-72"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-64">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">{restaurant.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 truncate">{restaurant.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orb 1 - Orange */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 70%)",
        }}
        initial={{ x: "-20%", y: "-20%" }}
        animate={{
          x: ["-20%", "10%", "-10%", "-20%"],
          y: ["-20%", "10%", "20%", "-20%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient Orb 2 - Red */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0) 70%)",
        }}
        initial={{ x: "60%", y: "60%" }}
        animate={{
          x: ["60%", "40%", "70%", "60%"],
          y: ["60%", "30%", "50%", "60%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient Orb 3 - Yellow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(251,191,36,0) 70%)",
        }}
        initial={{ x: "80%", y: "-10%" }}
        animate={{
          x: ["80%", "50%", "90%", "80%"],
          y: ["-10%", "20%", "0%", "-10%"],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient Orb 4 - Pink/Purple */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(236,72,153,0) 70%)",
        }}
        initial={{ x: "20%", y: "70%" }}
        animate={{
          x: ["20%", "40%", "10%", "20%"],
          y: ["70%", "50%", "80%", "70%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(at 40% 20%, rgba(249,115,22,0.15) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(239,68,68,0.1) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(251,191,36,0.1) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(236,72,153,0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(249,115,22,0.15) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(239,68,68,0.1) 0px, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isLast?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isLast = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${!isLast ? 'border-b border-gray-200' : ''}`}>
      <button
        className="w-full p-4 text-left flex items-start gap-3 hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus
          className={`${isOpen ? 'rotate-45' : 'rotate-0'
            } transition-transform duration-300 ease-in-out w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5`}
        />
        <span className="font-semibold text-gray-900 text-base md:text-lg">
          {question}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 px-4 pb-4 pl-12 text-sm md:text-base leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === 'yearly') {
      return Math.round(monthlyPrice * 10);
    }
    return monthlyPrice;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Custom Smooth Cursor */}
      <SmoothCursor
        color="#ea580c"
        size={25}
        rotateOnMove={true}
        scaleOnClick={true}
        glowEffect={true}
      />

      {/* Navbar */}
      <motion.nav
        className={`border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">KHAO PEEO</h1>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {["Features", "Pricing", "About Us", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" className="text-gray-700">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {["Features", "Pricing", "About Us", "Contact"].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="text-gray-700 hover:text-orange-600 py-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <Link to="/auth">
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="w-full px-8 bg-orange-600 hover:bg-orange-700">Start Free Trial</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex flex-col">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Scroll Text Marquee */}
        <div className="relative z-10 py-4 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-orange-600/10 border-b border-orange-200/30">
          <ScrollBaseAnimation
            baseVelocity={-2}
            clasname="text-2xl md:text-3xl font-bold tracking-tight text-orange-600"
          >
            WELCOME TO KHAO-PEEO •
          </ScrollBaseAnimation>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-orange-700 font-semibold text-sm border border-orange-200 shadow-sm"
                variants={itemVariants}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                India's #1 Restaurant POS & Billing Software
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900"
                variants={itemVariants}
              >
                Smart{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Restaurant Billing
                </span>{" "}
                Made Simple
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                All-in-one POS system for restaurants, cafes & cloud kitchens. Generate GST-compliant bills, manage orders with KOT, track inventory & boost your revenue — all from one powerful dashboard.
              </motion.p>

              {/* Key Features Pills */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                {[
                  { icon: Receipt, text: "GST Billing" },
                  { icon: Printer, text: "KOT Printing" },
                  { icon: QrCode, text: "QR Ordering" },
                  { icon: ChefHat, text: "Kitchen Display" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    <feature.icon className="h-4 w-4 text-orange-600" />
                    {feature.text}
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg px-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                    Start Free Trial
                    <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded">14 Days</span>
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 border-gray-300 text-orange-600 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <Phone className="h-5 w-5 mr-2" />
                  Request Demo
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 pt-6 text-sm text-gray-600"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Free setup assistance</span>
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="flex items-center gap-4 pt-4"
                variants={itemVariants}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-900">5,000+</span>
                  <span className="text-gray-600"> restaurants trust us</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-600/20 rounded-3xl blur-3xl" />

              {/* Main Dashboard Image */}
              <div className="block relative">
                <img
                  src="/hero-dashboard.png"
                  alt="KHAO PEEO Restaurant POS System - GST Billing, Inventory Tracking, Table Management, KOT Printing"
                  className="relative rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02] w-full"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Today's Sales</p>
                    <p className="font-bold text-gray-900">₹45,250</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Bills Generated</p>
                    <p className="font-bold text-gray-900">127 Today</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg px-4 py-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm font-medium">GST Compliant ✓</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Restaurants Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Trusted by Leading Restaurants
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of successful restaurants in Airoli and Koparkhairane
            </p>
          </motion.div>
          <TrustedRestaurantsCarousel />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              { value: "0", label: "Active Restaurants" },
              { value: "0", label: "Monthly Transactions" },
              { value: "99.9%", label: "Uptime Guaranteed" },
              { value: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Everything You Need to Run Your Restaurant</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful billing, seamless operations, and real-time insights — all in one platform
          </p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: Receipt, color: "bg-orange-100", iconColor: "text-orange-600", title: "GST-Compliant Billing", description: "Generate accurate GST invoices instantly. Supports CGST, SGST, and IGST calculations with automatic tax reports for hassle-free filing." },
            { icon: Printer, color: "bg-blue-100", iconColor: "text-blue-600", title: "KOT & Kitchen Printing", description: "Send orders directly to kitchen printers. Manage multiple KOT printers for different sections — main kitchen, bar, desserts, and more." },
            { icon: Users, color: "bg-green-100", iconColor: "text-green-600", title: "Table & Order Management", description: "Visual table layout with real-time status. Split bills, merge tables, transfer orders, and manage dine-in, takeaway & delivery." },
            { icon: BarChart3, color: "bg-purple-100", iconColor: "text-purple-600", title: "Sales & Inventory Reports", description: "Track daily sales, best-selling items, stock levels, and profit margins. Get insights to make smarter business decisions." },
            { icon: QrCode, color: "bg-red-100", iconColor: "text-red-600", title: "QR Code Ordering", description: "Let customers scan, browse menu, and order from their phones. Reduce wait time and increase table turnover." },
            { icon: Smartphone, color: "bg-yellow-100", iconColor: "text-yellow-600", title: "Works Offline", description: "No internet? No problem. Continue billing offline and sync automatically when connection is restored." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Animated gradient overlay - appears on hover */}
              <div
                className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.08) 40%, rgba(0, 0, 0, 0) 70%)',
                }}
              />

              {/* Icon container with enhanced animation */}
              <div className="relative mb-6 group-hover:mb-4 transition-all duration-500">
                <div className={`h-14 w-14 ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
                  {/* Icon glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <feature.icon className={`h-7 w-7 ${feature.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-500`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Learn more link - fades in on hover */}
              <a
                href="#"
                className="relative text-base text-orange-600 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 flex items-center gap-1 transition-all duration-500"
              >
                Learn more
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.span>
              </a>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your restaurant. All plans include 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${billingCycle === 'yearly' ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
              <span className={`font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <motion.span
                  className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Save 2 months!
                </motion.span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Starter Plan */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 h-full flex flex-col"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Starter</h3>
                <p className="text-gray-600 mb-6">Perfect for small restaurants & cafes</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹{getPrice(2999).toLocaleString()}</span>
                  <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Up to 10 tables", "GST billing & invoicing", "Basic KOT printing", "Daily sales reports", "Email & chat support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl p-8 relative h-full flex flex-col lg:scale-105"
              variants={itemVariants}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-white">Professional</h3>
                <p className="text-orange-100 mb-6">For growing restaurants</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">₹{getPrice(5999).toLocaleString()}</span>
                  <span className="text-orange-100">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Up to 30 tables", "Advanced billing & multiple KOT", "Full inventory management", "Staff & attendance tracking", "QR code ordering", "Priority phone support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-white hover:bg-gray-100 text-orange-600">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 h-full flex flex-col"
              variants={itemVariants}
            >
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
                <p className="text-gray-600 mb-6">For chains & franchises</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹{getPrice(12999).toLocaleString()}</span>
                  <span className="text-gray-600">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {["Unlimited tables & outlets", "Multi-location dashboard", "Central menu management", "Custom integrations & API", "Dedicated account manager", "24/7 priority support"].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/auth" className="block mt-auto">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Restaurant Owners Choose KHAO PEEO</h2>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: Zap, color: "bg-orange-100", iconColor: "text-orange-600", title: "Lightning Fast", description: "Generate bills in under 10 seconds" },
            { icon: Receipt, color: "bg-blue-100", iconColor: "text-blue-600", title: "100% GST Compliant", description: "Auto-calculate & file GST returns" },
            { icon: Headphones, color: "bg-green-100", iconColor: "text-green-600", title: "Expert Support", description: "Free setup & training included" },
            { icon: Smartphone, color: "bg-purple-100", iconColor: "text-purple-600", title: "Works Anywhere", description: "Cloud-based with offline mode" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <div className={`h-16 w-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`h-8 w-8 ${item.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-to-r from-orange-600 to-red-600 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Simplify Your Restaurant Billing?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join 5,000+ restaurants using KHAO PEEO to streamline billing, manage orders, and grow their business.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/auth">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 transition-all duration-300 hover:scale-105">
                Start 14-Day Free Trial
              </Button>
            </Link>
            <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 transition-all duration-300 hover:scale-105">
              <Phone className="h-5 w-5 mr-2" />
              Call: +91 91525 15229
            </Button>
          </motion.div>
          <motion.p
            className="text-orange-100 mt-6 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            No credit card required • Free setup assistance • Cancel anytime
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">KHAO PEEO</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                India's leading restaurant POS & billing software. Trusted by 5,000+ restaurants for GST-compliant billing, order management, and business growth.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="https://www.linkedin.com/in/krish9113/"
                    className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Product */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                {["Billing Software", "KOT Management", "Inventory", "Reports & Analytics", "QR Ordering", "Integrations"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-500 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Press Kit", "Partners"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-orange-500 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Airoli, Navi Mumbai, Maharashtra 400708</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="tel:+9191525 15229" className="text-sm hover:text-orange-500">+91 91525 15229</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                  <a href="mailto:hello@khaopeeo.com" className="text-sm hover:text-orange-500">hello@khaopeeo.com</a>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 KHAO PEEO. All rights reserved. 
                <br />
                 <a className="" href="https://netbro.in/">Netbro</a>
              </p>
              <div className="flex gap-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;