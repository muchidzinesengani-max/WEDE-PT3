// =====================================================
// MABASO ELECTRICAL SERVICES - MAIN SCRIPT
// Author: MUTSHIDZI NESENGANI - ST10518407
// Part 3: JavaScript functionality
// =====================================================

(function () {
    'use strict';

    // CONFIG // (change these values in one place)
    var CONFIG = {
        recipient: 'info@mabasoelectrical.co.za',
        // FORM ENDPOINT // create a free form at formspree.io and paste its URL here
        formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
        map: {
            cbd: { name: 'Polokwane CBD Office', lat: -23.9045, lng: 29.4689 },
            bendor: { name: 'Bendor Service Area', lat: -23.8750, lng: 29.4400 }
        }
    };

    // SERVICE DETAILS // used by the services modal
    var SERVICE_DETAILS = {
        wiring: {
            title: 'Residential & Commercial Wiring',
            points: ['New installations for homes and businesses', 'Rewiring of older properties', 'Upgrades to meet current safety standards', 'Certificate of Compliance on completion where required']
        },
        'fault-finding': {
            title: 'Fault-Finding & Repairs',
            points: ['Tripping breakers and power outages', 'Flickering lights and faulty plug points', 'Testing of circuits to find the root cause', 'Most repairs completed on the same visit']
        },
        'db-board': {
            title: 'DB Board Upgrades',
            points: ['Replacement of old distribution boards', 'Earth leakage and surge protection', 'Capacity for modern electrical loads', 'Neat labelling of every circuit']
        },
        coc: {
            title: 'Certificates of Compliance (COC)',
            points: ['Inspection of the full installation', 'Needed for property sales and rentals', 'Often asked for by insurers', 'Faults found are quoted for before any work starts']
        },
        solar: {
            title: 'Solar-Ready Installations',
            points: ['Wiring and groundwork for solar panels', 'Prepared DB board for an inverter', 'Safe isolation and changeover planning', 'Works with the installer you choose']
        },
        maintenance: {
            title: 'Maintenance Contracts',
            points: ['Scheduled inspections for landlords and small businesses', 'Faults found early, before they become outages', 'One point of contact for all electrical work', 'Priority booking for contract clients']
        }
    };

    // FAQ DATA // used when faqs.json cannot be loaded (for example when opening the file directly)
    var FAQ_FALLBACK = [
        { q: 'Do I need a Certificate of Compliance (COC) to sell my house?', a: 'Yes. In South Africa an Electrical Certificate of Compliance is needed when a property is sold. We inspect the installation and issue the certificate if it passes.' },
        { q: 'What happens if my installation fails the COC inspection?', a: 'We give you a clear list of the faults and a quote to fix them. Once the work is done we re-inspect and issue the certificate.' },
        { q: 'Why does my breaker keep tripping?', a: 'Common causes are an overloaded circuit, a faulty appliance, or damaged wiring. Do not keep resetting it. Book a fault-finding visit so we can test the circuit safely.' },
        { q: 'Do you work on weekends or after hours?', a: 'We work Monday to Friday and on Saturday mornings. Emergency call-outs are available on request and additional rates apply.' },
        { q: 'Can you prepare my home for solar panels?', a: 'Yes. We do the electrical groundwork and DB board changes so a solar installer can connect panels and an inverter safely.' }
    ];

    // SMALL HELPERS //
    function $(selector, scope) { return (scope || document).querySelector(selector); }
    function $$(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) { node.className = className; }
        if (text !== undefined) { node.textContent = text; }
        return node;
    }

    // ESCAPE TEXT // stops user input from being read as HTML
    function cleanText(value) {
        return String(value).replace(/[<>]/g, '').trim();
    }

    // FOOTER YEAR AND SHARE LINKS //
    function initFooter() {
        var bottom = $('.footer-bottom p');
        if (bottom) {
            bottom.innerHTML = '&copy; ' + new Date().getFullYear() + ' Mabaso Electrical Services. All rights reserved.';
        }

        var footerGrid = $('.footer-grid');
        if (!footerGrid) { return; }

        var box = el('div', 'share-links');
        box.appendChild(el('h4', '', 'Share This Page'));

        var url = encodeURIComponent(window.location.href);
        var text = encodeURIComponent('Mabaso Electrical Services - electricians in Polokwane');
        var links = [
            { label: 'Facebook', href: 'https://www.facebook.com/sharer/sharer.php?u=' + url },
            { label: 'WhatsApp', href: 'https://wa.me/?text=' + text + '%20' + url },
            { label: 'X (Twitter)', href: 'https://twitter.com/intent/tweet?text=' + text + '&url=' + url }
        ];
        links.forEach(function (item) {
            var p = el('p');
            var a = el('a', '', item.label);
            a.href = item.href;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            p.appendChild(a);
            box.appendChild(p);
        });
        footerGrid.appendChild(box);
    }

    // SCROLL ANIMATIONS // sections fade in as they enter the screen
    function initReveal() {
        var targets = $$('.card, .section-title, .section-intro, .location-card, .gallery-item');
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        targets.forEach(function (node) {
            node.classList.add('reveal');
            observer.observe(node);
        });
    }

    // BACK TO TOP BUTTON // created and shown with DOM manipulation
    function initBackToTop() {
        var btn = el('button', 'back-to-top', '\u2191');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);

        window.addEventListener('scroll', function () {
            btn.classList.toggle('is-shown', window.scrollY > 400);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ACCORDION // FAQ items load from faqs.json (with a built-in fallback)
    function buildAccordion(container, items) {
        container.innerHTML = '';
        items.forEach(function (item, index) {
            var wrap = el('div', 'accordion-item');
            var heading = el('h3', 'accordion-heading');
            var btn = el('button', 'accordion-button', item.q);
            var panel = el('div', 'accordion-panel');
            var inner = el('p', '', item.a);

            btn.type = 'button';
            btn.id = 'faq-btn-' + index;
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', 'faq-panel-' + index);
            panel.id = 'faq-panel-' + index;
            panel.setAttribute('role', 'region');
            panel.setAttribute('aria-labelledby', btn.id);
            panel.appendChild(inner);
            heading.appendChild(btn);
            wrap.appendChild(heading);
            wrap.appendChild(panel);
            container.appendChild(wrap);

            btn.addEventListener('click', function () {
                var open = btn.getAttribute('aria-expanded') === 'true';
                // CLOSE OTHERS // only one answer open at a time
                $$('.accordion-button', container).forEach(function (other) {
                    other.setAttribute('aria-expanded', 'false');
                    other.parentNode.nextElementSibling.style.maxHeight = null;
                });
                if (!open) {
                    btn.setAttribute('aria-expanded', 'true');
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            });
        });
    }

    function initFaq() {
        var container = $('#faqList');
        if (!container) { return; }

        container.textContent = 'Loading questions...';

        fetch('data/faqs.json')
            .then(function (response) {
                if (!response.ok) { throw new Error('FAQ file not found'); }
                return response.json();
            })
            .then(function (items) { buildAccordion(container, items); })
            .catch(function () { buildAccordion(container, FAQ_FALLBACK); });
    }

    // TABS // about page
    function initTabs() {
        var tablist = $('.tab-list');
        if (!tablist) { return; }

        var tabs = $$('[role="tab"]', tablist);
        var panels = $$('[role="tabpanel"]');

        function select(tab) {
            tabs.forEach(function (t) {
                var active = t === tab;
                t.setAttribute('aria-selected', String(active));
                t.tabIndex = active ? 0 : -1;
            });
            panels.forEach(function (panel) {
                panel.hidden = panel.id !== tab.getAttribute('aria-controls');
            });
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () { select(tab); });
            tab.addEventListener('keydown', function (e) {
                var next = null;
                if (e.key === 'ArrowRight') { next = tabs[(index + 1) % tabs.length]; }
                if (e.key === 'ArrowLeft') { next = tabs[(index - 1 + tabs.length) % tabs.length]; }
                if (next) { e.preventDefault(); next.focus(); select(next); }
            });
        });
    }

    // MODAL // service details on the services page
    function initServiceModal() {
        var cards = $$('[data-service]');
        if (!cards.length) { return; }

        var overlay = el('div', 'modal-overlay');
        overlay.hidden = true;
        var dialog = el('div', 'modal');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-labelledby', 'modalTitle');

        var closeBtn = el('button', 'modal-close', '\u00d7');
        closeBtn.type = 'button';
        closeBtn.setAttribute('aria-label', 'Close details');
        var title = el('h2', '', '');
        title.id = 'modalTitle';
        var list = el('ul', 'modal-list');
        var quote = el('a', 'btn btn-primary', 'Request a Quote');

        dialog.appendChild(closeBtn);
        dialog.appendChild(title);
        dialog.appendChild(list);
        dialog.appendChild(quote);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        var lastFocus = null;

        function open(key, trigger) {
            var data = SERVICE_DETAILS[key];
            if (!data) { return; }
            lastFocus = trigger;
            title.textContent = data.title;
            list.innerHTML = '';
            data.points.forEach(function (point) { list.appendChild(el('li', '', point)); });
            quote.href = 'enquiry.html?service=' + encodeURIComponent(key);
            overlay.hidden = false;
            document.body.classList.add('no-scroll');
            closeBtn.focus();
        }

        function close() {
            overlay.hidden = true;
            document.body.classList.remove('no-scroll');
            if (lastFocus) { lastFocus.focus(); }
        }

        cards.forEach(function (card) {
            var btn = el('button', 'btn-link', 'View details');
            btn.type = 'button';
            card.appendChild(btn);
            btn.addEventListener('click', function () { open(card.getAttribute('data-service'), btn); });
        });

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) { close(); } });
        document.addEventListener('keydown', function (e) {
            if (!overlay.hidden && e.key === 'Escape') { close(); }
        });
    }

    // SEARCH, FILTER AND SORT // services page
    function initServiceFilter() {
        var grid = $('#serviceGrid');
        var search = $('#serviceSearch');
        if (!grid || !search) { return; }

        var cards = $$('.card', grid);
        var buttons = $$('.filter-btn');
        var sortSelect = $('#serviceSort');
        var status = $('#serviceStatus');
        var category = 'all';

        function apply() {
            var term = search.value.toLowerCase().trim();
            var shown = 0;

            cards.forEach(function (card) {
                var text = card.textContent.toLowerCase();
                var matchTerm = !term || text.indexOf(term) !== -1;
                var matchCat = category === 'all' || card.getAttribute('data-category') === category;
                var visible = matchTerm && matchCat;
                card.hidden = !visible;
                if (visible) { shown += 1; }
            });

            // SORT // re-order the cards in the DOM
            var sorted = cards.slice().sort(function (a, b) {
                var nameA = $('h3', a).textContent;
                var nameB = $('h3', b).textContent;
                if (sortSelect.value === 'za') { return nameB.localeCompare(nameA); }
                if (sortSelect.value === 'az') { return nameA.localeCompare(nameB); }
                return cards.indexOf(a) - cards.indexOf(b);
            });
            sorted.forEach(function (card) { grid.appendChild(card); });

            status.textContent = shown === 0
                ? 'No services match your search. Try a different word.'
                : 'Showing ' + shown + ' of ' + cards.length + ' services.';
        }

        search.addEventListener('input', apply);
        sortSelect.addEventListener('change', apply);
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                category = btn.getAttribute('data-filter');
                buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
                apply();
            });
        });
        apply();
    }

    // GALLERY LIGHTBOX // home page
    function initLightbox() {
        var items = $$('.gallery-item');
        if (!items.length) { return; }

        var overlay = el('div', 'lightbox');
        overlay.hidden = true;
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Image viewer');

        var img = el('img', 'lightbox-image');
        var caption = el('p', 'lightbox-caption');
        var closeBtn = el('button', 'lightbox-btn lightbox-close', '\u00d7');
        var prevBtn = el('button', 'lightbox-btn lightbox-prev', '\u2039');
        var nextBtn = el('button', 'lightbox-btn lightbox-next', '\u203a');
        [closeBtn, prevBtn, nextBtn].forEach(function (b) { b.type = 'button'; });
        closeBtn.setAttribute('aria-label', 'Close image');
        prevBtn.setAttribute('aria-label', 'Previous image');
        nextBtn.setAttribute('aria-label', 'Next image');

        overlay.appendChild(closeBtn);
        overlay.appendChild(prevBtn);
        overlay.appendChild(img);
        overlay.appendChild(nextBtn);
        overlay.appendChild(caption);
        document.body.appendChild(overlay);

        var current = 0;

        function show(index) {
            current = (index + items.length) % items.length;
            var source = $('img', items[current]);
            img.src = items[current].getAttribute('data-large');
            img.alt = source.alt;
            caption.textContent = source.alt + ' (' + (current + 1) + ' of ' + items.length + ')';
        }

        function open(index) {
            show(index);
            overlay.hidden = false;
            document.body.classList.add('no-scroll');
            closeBtn.focus();
        }

        function close() {
            overlay.hidden = true;
            document.body.classList.remove('no-scroll');
            items[current].focus();
        }

        items.forEach(function (item, index) {
            item.addEventListener('click', function () { open(index); });
        });
        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', function () { show(current - 1); });
        nextBtn.addEventListener('click', function () { show(current + 1); });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) { close(); } });
        document.addEventListener('keydown', function (e) {
            if (overlay.hidden) { return; }
            if (e.key === 'Escape') { close(); }
            if (e.key === 'ArrowLeft') { show(current - 1); }
            if (e.key === 'ArrowRight') { show(current + 1); }
        });
    }

    // INTERACTIVE MAP // Leaflet + OpenStreetMap on the contact page
    function initMap() {
        var mapBox = $('#map');
        if (!mapBox) { return; }
        if (typeof L === 'undefined') {
            mapBox.textContent = 'The map could not be loaded. Please check your internet connection.';
            return;
        }

        var map = L.map(mapBox, { scrollWheelZoom: false }).setView([CONFIG.map.cbd.lat, CONFIG.map.cbd.lng], 12);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var markers = {};
        Object.keys(CONFIG.map).forEach(function (key) {
            var place = CONFIG.map[key];
            markers[key] = L.marker([place.lat, place.lng]).addTo(map).bindPopup('<strong>' + place.name + '</strong>');
        });

        // SHOW ON MAP BUTTONS // added to each location card
        $$('.location-card').forEach(function (card) {
            var key = card.getAttribute('data-location');
            if (!key || !markers[key]) { return; }
            var btn = el('button', 'btn-link', 'Show on map');
            btn.type = 'button';
            card.appendChild(btn);
            btn.addEventListener('click', function () {
                map.flyTo([CONFIG.map[key].lat, CONFIG.map[key].lng], 14);
                markers[key].openPopup();
                mapBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    // FORM HELPERS //
    function fieldError(field, message) {
        var id = field.id + '-error';
        var box = document.getElementById(id);
        if (!box) {
            box = el('span', 'field-error');
            box.id = id;
            box.setAttribute('role', 'alert');
            field.parentNode.appendChild(box);
        }
        box.textContent = message;
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', id);
    }

    function clearError(field) {
        var box = document.getElementById(field.id + '-error');
        if (box) { box.textContent = ''; }
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
    }

    var RULES = {
        name: function (v) {
            if (!v) { return 'Please enter your full name.'; }
            if (v.length < 2) { return 'Your name must be at least 2 characters.'; }
            if (!/^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F\s'.-]*$/.test(v)) { return 'Use letters only in your name.'; }
            return '';
        },
        phone: function (v) {
            if (!v) { return 'Please enter your phone number.'; }
            var digits = v.replace(/[\s()-]/g, '');
            if (!/^(?:\+27|0)[1-8]\d{8}$/.test(digits)) { return 'Enter a valid South African number, for example 082 000 0000.'; }
            return '';
        },
        email: function (v) {
            if (!v) { return 'Please enter your email address.'; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter a valid email address, for example you@example.com.'; }
            return '';
        },
        select: function (v) { return v ? '' : 'Please choose an option.'; },
        date: function (v) {
            if (!v) { return ''; }
            var chosen = new Date(v + 'T00:00:00');
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            var limit = new Date(today);
            limit.setFullYear(limit.getFullYear() + 1);
            if (isNaN(chosen.getTime())) { return 'Enter a valid date.'; }
            if (chosen < today) { return 'The date cannot be in the past.'; }
            if (chosen > limit) { return 'Please choose a date within the next year.'; }
            return '';
        },
        address: function (v) {
            if (!v) { return 'Please enter the suburb or address.'; }
            if (v.length < 3) { return 'The address must be at least 3 characters.'; }
            return '';
        },
        message: function (v) {
            if (!v) { return 'Please write a message.'; }
            if (v.length < 10) { return 'Your message must be at least 10 characters.'; }
            if (v.length > 1000) { return 'Your message must be 1000 characters or less.'; }
            return '';
        }
    };

    // VALIDATE FORM // returns true when every field passes
    function validateForm(form, map) {
        var firstBad = null;
        Object.keys(map).forEach(function (id) {
            var field = document.getElementById(id);
            var error = RULES[map[id]](cleanText(field.value));
            if (error) {
                fieldError(field, error);
                if (!firstBad) { firstBad = field; }
            } else {
                clearError(field);
            }
        });
        if (firstBad) { firstBad.focus(); }
        return !firstBad;
    }

    // LIVE VALIDATION // check a field when the user leaves it
    function watchFields(map) {
        Object.keys(map).forEach(function (id) {
            var field = document.getElementById(id);
            field.addEventListener('blur', function () {
                var error = RULES[map[id]](cleanText(field.value));
                if (error) { fieldError(field, error); } else { clearError(field); }
            });
            field.addEventListener('input', function () {
                if (field.classList.contains('is-invalid')) {
                    var error = RULES[map[id]](cleanText(field.value));
                    if (!error) { clearError(field); }
                }
            });
        });
    }

    // AJAX SUBMIT // sends the form data without reloading the page
    function sendAjax(data) {
        if (CONFIG.formEndpoint.indexOf('YOUR_FORM_ID') !== -1) {
            return Promise.resolve({ sent: false, reason: 'not-configured' });
        }
        return fetch(CONFIG.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (!response.ok) { throw new Error('Server error ' + response.status); }
            return { sent: true };
        });
    }

    // MAILTO LINK // lets the customer send the compiled email to the recipient
    function buildMailto(subject, body) {
        return 'mailto:' + CONFIG.recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }

    // RESULT BOX // shows the response under the form
    function showResult(box, heading, lines, mailto, note, isError) {
        box.innerHTML = '';
        box.hidden = false;
        box.className = 'form-response' + (isError ? ' is-error' : '');
        box.appendChild(el('h3', '', heading));
        lines.forEach(function (line) { box.appendChild(el('p', '', line)); });
        if (note) { box.appendChild(el('p', 'form-note', note)); }
        if (mailto) {
            var link = el('a', 'btn btn-primary', 'Send this as an email');
            link.href = mailto;
            box.appendChild(link);
        }
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        box.focus();
    }

    // ENQUIRY PRICING AND AVAILABILITY // rule-based response (indicative only)
    var SERVICE_INFO = {
        wiring: { label: 'Residential/Commercial Wiring', cost: 'Quotes start after a site visit. Small jobs often fall between R1 500 and R6 000; full rewiring is priced per point.', days: 5 },
        'fault-finding': { label: 'Fault-Finding & Repairs', cost: 'A call-out and testing fee applies, usually between R450 and R1 200, plus parts.', days: 1 },
        'db-board': { label: 'DB Board Upgrade', cost: 'Most DB board upgrades fall between R3 500 and R9 000, depending on the number of circuits.', days: 3 },
        coc: { label: 'Certificate of Compliance', cost: 'COC inspections usually cost between R900 and R2 500, depending on the size of the property.', days: 3 },
        solar: { label: 'Solar-Ready Installation', cost: 'Priced per job after a site visit. We quote the electrical work only, not the panels or inverter.', days: 7 },
        maintenance: { label: 'Maintenance Contract', cost: 'Contracts are priced per property. We quote after one inspection visit.', days: 7 },
        other: { label: 'Other electrical work', cost: 'We will price your job after we have read the details.', days: 3 }
    };

    function availabilityFor(info, dateValue) {
        if (!dateValue) {
            return 'Our earliest slot is usually within ' + info.days + ' working day' + (info.days > 1 ? 's' : '') + '. We will confirm a time when we reply.';
        }
        var day = new Date(dateValue + 'T00:00:00').getDay();
        var pretty = new Date(dateValue + 'T00:00:00').toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        if (day === 0) { return pretty + ' is a Sunday. We are closed, but we can offer the Monday instead or an emergency call-out on request.'; }
        if (day === 6) { return pretty + ' is a Saturday. We work 08:00 to 13:00 on Saturdays, so morning slots may be available.'; }
        return pretty + ' is a working day. We will confirm a time between 07:00 and 17:00 when we reply.';
    }

    function initEnquiryForm() {
        var form = $('#enquiryForm');
        if (!form) { return; }

        var map = {
            fullName: 'name', phone: 'phone', email: 'email', serviceType: 'select',
            preferredDate: 'date', address: 'address', message: 'message'
        };
        var result = $('#formResult');
        var submitBtn = $('button[type="submit"]', form);

        // PRE-SELECT SERVICE // from the link on the services modal
        var params = new URLSearchParams(window.location.search);
        var presetKey = params.get('service');
        if (presetKey && SERVICE_INFO[presetKey]) { $('#serviceType').value = presetKey; }

        // DATE MIN // stop past dates in the date picker
        var dateField = $('#preferredDate');
        dateField.min = new Date().toISOString().split('T')[0];

        watchFields(map);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(form, map)) { return; }

            var data = {
                name: cleanText($('#fullName').value),
                phone: cleanText($('#phone').value),
                email: cleanText($('#email').value),
                service: cleanText($('#serviceType').value),
                date: cleanText($('#preferredDate').value),
                address: cleanText($('#address').value),
                message: cleanText($('#message').value)
            };
            var info = SERVICE_INFO[data.service] || SERVICE_INFO.other;

            var body = 'Quote request from the website\n\n' +
                'Name: ' + data.name + '\nPhone: ' + data.phone + '\nEmail: ' + data.email + '\n' +
                'Service: ' + info.label + '\nPreferred date: ' + (data.date || 'Not given') + '\n' +
                'Address: ' + data.address + '\n\nJob details:\n' + data.message;
            var mailto = buildMailto('Quote request: ' + info.label, body);

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            sendAjax(data).then(function (outcome) {
                var lines = [
                    'Service: ' + info.label,
                    'Estimated cost: ' + info.cost,
                    'Availability: ' + availabilityFor(info, data.date),
                    'These figures are a guide only. The final price is confirmed in your written quote.'
                ];
                var note = outcome.sent
                    ? 'Your enquiry was sent. We usually reply within one business day.'
                    : 'Your enquiry has not been emailed yet. Press the button below to send it to ' + CONFIG.recipient + '.';
                showResult(result, 'Thank you, ' + data.name.split(' ')[0] + '!', lines, outcome.sent ? null : mailto, note, false);
                if (outcome.sent) { form.reset(); }
            }).catch(function () {
                showResult(result, 'Something went wrong',
                    ['We could not send your enquiry. Please try again, or send it by email instead.'], mailto, '', true);
            }).then(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Enquiry';
            });
        });
    }

    function initContactForm() {
        var form = $('#contactForm');
        if (!form) { return; }

        var map = { contactName: 'name', contactEmail: 'email', contactReason: 'select', contactMessage: 'message' };
        var result = $('#contactResult');
        var submitBtn = $('button[type="submit"]', form);

        watchFields(map);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!validateForm(form, map)) { return; }

            var data = {
                name: cleanText($('#contactName').value),
                email: cleanText($('#contactEmail').value),
                reason: cleanText($('#contactReason').value),
                message: cleanText($('#contactMessage').value)
            };
            var body = 'Message from the website\n\nName: ' + data.name + '\nEmail: ' + data.email +
                '\nType of message: ' + data.reason + '\n\n' + data.message;
            var mailto = buildMailto('Website message: ' + data.reason, body);

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            sendAjax(data).then(function (outcome) {
                var note = outcome.sent
                    ? 'Your message was sent. We will reply as soon as we can.'
                    : 'Your message has not been emailed yet. Press the button below to send it to ' + CONFIG.recipient + '.';
                showResult(result, 'Thank you, ' + data.name.split(' ')[0] + '!',
                    ['Type of message: ' + data.reason], outcome.sent ? null : mailto, note, false);
                if (outcome.sent) { form.reset(); }
            }).catch(function () {
                showResult(result, 'Something went wrong',
                    ['We could not send your message. Please try again, or send it by email instead.'], mailto, '', true);
            }).then(function () {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
        });
    }

    // START // run everything once the page is ready
    document.addEventListener('DOMContentLoaded', function () {
        initFooter();
        initReveal();
        initBackToTop();
        initFaq();
        initTabs();
        initServiceModal();
        initServiceFilter();
        initLightbox();
        initMap();
        initEnquiryForm();
        initContactForm();
    });
})();
