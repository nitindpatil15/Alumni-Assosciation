import React, { useEffect } from "react";
import "./SuccessStory.css";

const SuccessStory = () => {
  useEffect(() => {
    const cardsContainer = document.querySelector(".card-container-story");

    // Dynamically add more cards
    for (let i = 3; i <= 20; i++) {
      const card = document.createElement("div");
      card.className = "card-story";
      card.innerHTML = `
          <div class="card-body-story">
              <h5 class="card-title-story">"Testimonial ${i}"</h5>
              <p class="card-text-story"><strong>- Customer ${i}</strong></p>
              <div class="stars-story">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          </div>
      `;
      cardsContainer.appendChild(card);
    }
  }, []);

  return (
          <main className="content-story">
        <div className="row-story">
          <div className="col-md-6-story" id="col-1-story">
            <h1 className="text-center mb-4-story">Success Stories of Our Alumni and students</h1>
          </div>
          <div className="col-md-6-story">
            <div className="card-container-story">
              <div className="card-story">
                <div className="card-body-story">
                  <h5 className="card-title-story">"WildApricot has everything a non-profit needs."</h5>
                  <p className="card-text-story">
                    <strong>- Lisa R.</strong>
                  </p>
                  <div className="stars-story">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
              </div>
              <div className="card-story">
                <div className="card-body-story">
                  <h5 className="card-title-story">"We found a simple Cloud application to decentralize tasks."</h5>
                  <p className="card-text-story">
                    <strong>- John S.</strong>
                  </p>
                  <div className="stars-story">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
            <h2>Check out more WildApricot reviews on Capterra, GetApp, and TrustPilot:</h2>
            <p>The sites linked here are not controlled by WildApricot, so this is honest-to-goodness feedback and not a marketing spin.</p>
        </div>
        <section class="testimonials">
            <div class="testimonial">
                <p>"Our partnership with WildApricot is the smartest move our company made from day one. We have expanded our business relationship with our members and continue to master and embrace the new technologies and upgrades WildApricot provides to keep our team up to date and competitive in the non-profit Association market."</p>
                <div class="author">Nena Gang</div>
                <div class="position">Administrative Director - Electrical Council of Florida</div>
            </div>
            <div class="testimonial">
                <p>"WildApricot has given us a professional-looking website and an easy way to manage our member communication. It's a lifesaver for us, because we love gardening, but are not experts in how to design and maintain a website."</p>
                <div class="author">Joseph Purdy</div>
                <div class="position">Communications Chair - Capitol Hill Garden Club, Washington, D.C.</div>
            </div>
            <div class="testimonial">
                <p>"WildApricot saves me over 15 hours a week! It's given our organization a professional membership service, includes an easy-to-use website and I love how it automatically charges our members' credit cards for their renewals."</p>
                <div class="author">Rick Watson</div>
                <div class="position">President - Friends of Valle de Oro National Wildlife Refuge</div>
            </div>
        </section>
      </main>
  );
};

export default SuccessStory;
