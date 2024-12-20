import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Faq() {
  return (
    <div className="container py-4 my-5">
      <p className="h1 text-center text-shadow">MedicalBuddy FAQ's</p>
      <div className="accordion accordion-flush my-5" id="accordionFlushExample">
        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              How do I book an appointment with a doctor?
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              Booking an appointment is easy! Simply search for the doctor or specialty, select an available time slot, and confirm your appointment.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Can I consult with a doctor online?
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              Yes, we offer teleconsultation services. You can book a video or phone consultation with our registered doctors.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              How do I get my lab test results?
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              Lab test results will be uploaded to your account once they are ready. You can access them under the “Lab Reports” section.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              Can I order medicines through MedicalBuddy?
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              Yes, you can upload your prescription and place an order for medicines. We offer doorstep delivery in select areas.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              How do I cancel or reschedule an appointment?
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              You can cancel or reschedule your appointment from the “My Appointments” section. Please note that cancellation policies may vary.
            </div>
          </div>
        </div>

        <div className="accordion-item border-0 mb-5">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed shadow rounded-5 btn btn-outline-primary fw-bold fs-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
            >
              What should I do in case of an emergency?
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body p-5 fs-5">
              In case of a medical emergency, please visit the nearest hospital or call the emergency services hotline immediately.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
