// components/EmailPopup.js
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "./frontend.css";



const Newsletter = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 2000); 
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter an email.");
            return;
        }

        const serviceID = "service_3hkljmf";
        const templateID = "template_xzx8xzx";
        const publicKey = "q1l_DC7jwQvu80xJ5";

        const templateParams = {
            user_email: email,
        };

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then(() => {
                setSubmitted(true);
                setError("");
                
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                setError("Something went wrong. Please try again.");
            });
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} centered dialogClassName="custom-modal">

            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Title className="w-100 text-center"><img src="./dubai-music-white-logo.webp" width="100%" /></Modal.Title>
            <Modal.Body className="text-center mt-3">
                {!submitted ? (
                    <>
                        <p>Sign up for exclusive offers, discounts & our monthly music newsletter.</p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="g-4 text-center">
                            <h4>ENTER YOUR EMAIL ADDRESS</h4>
                            <Form.Group controlId="formEmail" className="d-flex justify-content-center align-items-center">
                                <Form.Control
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="my-3 w-50"
                                />
                                <Button variant="dark" type="submit" className="submit ms-2">
                                    Sign up
                                </Button>
                            </Form.Group>
                        </Form>
                    </>
                ) : (
                    <Alert variant="success">
                        🎉 Thank you for signing up! We’ve received your email.
                    </Alert>
                )}
            </Modal.Body>

        </Modal>
    );
};

export default Newsletter;
