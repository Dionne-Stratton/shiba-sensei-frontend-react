import React from "react";

export default function Pricing() {
  return (
    <div className="main-page">
      <h2>Choose Your Plan</h2>
      <div>
        <h3>Free Beta Testing Plan</h3>
        <p>
          Sign up now to get exclusive access to Rabbi Rabbit during our beta
          testing phase. Enjoy all the lessons for free and help us shape the
          future of the app with your valuable feedback.
        </p>
        <button>Sign Up for Free Beta</button>
      </div>
      <div>
        <p>Projected pricing after beta testing phase:</p>
        <ul>
          <li>$10 per month for new users.</li>
          <li>$8 per month for previous beta testers.</li>
        </ul>
        <p>Either will offer your first three levels for free.</p>
      </div>
      {/* <div>
        <h3>New User Plan - $10/month</h3>
        <p>
          For new users joining after the beta testing phase, we will offer a
          subscription plan at $10 per month. Unlock full access to Rabbi
          Rabbit's extensive vocabulary library, interactive exercises, and
          personalized spaced repetition to supercharge your Hebrew language
          learning journey.
        </p>
        <button>Subscribe Now</button>
      </div>
      <div>
        <h3>Beta Tester Offer - $8/month</h3>
        <p>
          As a token of our gratitude to our beta testers, we will be delighted
          to offer a special discount of $8 per month for those who started
          during the beta testing phase. Continue your learning journey at a
          reduced price as a thank you for being an early supporter of Rabbi
          Rabbit.
        </p>
        <button>Continue Beta Tester Discount</button>
      </div> */}
    </div>
  );
}
