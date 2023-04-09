import React from 'react'

// const apiKey = 'AIzaSyCgOmfEnqxNlDabf7Qug0VKGl-l1WqdXLc';
const apiKey = 'AIzaSyCgOmfEnqxNlDabf7Qug0VKGl-l1WqdXLc';

const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.onload = () => {
            resolve(window.google.maps);
        };
        script.onerror = () => {
            reject(new Error('Failed to load Google Maps API'));
        };

        document.head.appendChild(script);
    });
};

export default loadGoogleMapsAPI;
