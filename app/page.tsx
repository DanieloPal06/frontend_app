import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">PredictPal</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Unlock the power of data-driven betting with our advanced AI predictions for table tennis matches.</p>
        <Link href="/matches" passHref>
          <Button size="lg" className="mr-4">View Upcoming Matches</Button>
        </Link>
        <Link href="/subscription" passHref>
          <Button size="lg" variant="outline">Start Free Trial</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              Our advanced AI analyzes player statistics, historical data, and current form to provide you with the most accurate predictions for table tennis matches.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>In-Depth Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              Access detailed player profiles, head-to-head records, and performance metrics to make informed betting decisions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Expert Courses</CardTitle>
            </CardHeader>
            <CardContent>
              Enhance your betting strategies with our curated courses taught by professional analysts and successful bettors.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-16 rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p>Create your account and choose a subscription plan that fits your needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Analyze Matches</h3>
              <p>Browse upcoming matches and view our AI-powered predictions and analysis.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Make Informed Bets</h3>
              <p>Use our insights to place smarter bets and improve your winning chances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section>
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4">"PredictPal has completely transformed my betting strategy. The AI predictions are incredibly accurate!"</p>
              <p className="font-semibold">- John D., Professional Bettor</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4">"The in-depth analysis and expert courses have helped me understand table tennis betting like never before."</p>
              <p className="font-semibold">- Sarah M., Sports Journalist</p>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Winning?</h2>
        <p className="text-xl mb-8">Join thousands of successful bettors using PredictPal</p>
        <Link href="/subscription" passHref>
          <Button size="lg" variant="secondary" className="mr-4">
            Start Free Trial
          </Button>
        </Link>
        <Link href="/courses" passHref>
          <Button size="lg" variant="outline">
            Explore Courses
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">PredictPal</h3>
            <p className="text-sm text-muted-foreground">Empowering bettors with AI-driven insights and expert analysis.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/matches">Matches</Link></li>
              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/subscription">Pricing</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2025 PredictPal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}