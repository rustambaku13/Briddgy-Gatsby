import { Container, Heading } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { BottomNavbar } from '../../components/Navbar/BottomNavbar'

const TermsAndConditions = ({location})=>{

    return (

        <>
<Helmet
        title="Briddgy | Terms & Conditions"
        defer={false}
      >
        <meta
          name="description"
          content="Briddgy postless, peer-to-peer delivery platform. Worldwide shopping with fastest and cheapest delivery. Travel with minimum costs and earn money."
        />
      </Helmet>
      <Navbar />
      <BottomNavbar />
      <Container mb="10" as="section" bg="outline.light" py={[16, "100px"]} maxW="full">
        <Container maxW="container.xxl">
          <Heading mb={10} fontWeight="700" fontSize="hb4">
            Terms and Conditions
          </Heading>
        </Container>
        </Container>
        <Container className="terms" maxW='container.xl'>  
            <Tabs variant="soft-rounded" >
                <TabList>
                    <Tab>Terms & Conditions</Tab>
                    <Tab>Privacy Policy</Tab>
                    <Tab>Tri-Party agreement</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                    <h2>1. Subject</h2>
                            <p>
                                www.briddgy.com is a social network, developed
                                to arrange a communication between people who
                                travel to other cities and those who need to
                                send or bring something from different cities.
                                When we mention Briddgy, we mean
                                www.briddgy.com, together with affiliated
                                applications and websites. These terms and
                                conditions have the purpose of governing access
                                to and the terms of use of the social network.
                                Please read them attentively! You should
                                understand and recognize that Briddgy is not
                                party to any agreement or contractual relations
                                of any nature between its users. By clicking
                                “Accept”, you recognize having read and accepted
                                all these general conditions of use. If you do
                                not agree to the Terms, you may not access or
                                use the platform. These Terms of conditions
                                contain important information about Your legal
                                rights, remedies and obligations.
                            </p>
                            <h2>
                                2. Amendments to the Briddgy, Terms of Use and
                                Documents Incorporated
                            </h2>
                            <p>
                                {' '}
                                Briddgy is constantly changing and improving. In our sole discretion, we
                                reserve the right to modify it, add or remove features or functionalities with or without notice to you.
                                If we tend to make changes to those Terms, or
                                the other document incorporated by reference
                                here, we'll post the changes to the Terms of Use
                                pages of our website.
                            </p>
                            <h2>3. Who can use Briddgy?</h2>
                            <p>
                                You may use Briddgy, including its features, or
                                become a member of the platform only if you are
                                18 years old or older (if the age of majority in
                                the country in which you reside is greater than
                                18). You warrant that you have the authority,
                                capacity and right to enter into and be bound by
                                the Terms and that by using Briddgy you will not
                                be violating any law or regulation of the
                                country in which you reside. You are responsible
                                for your compliance with all applicable local
                                regulations and laws.
                            </p>
                            <h2>4. Verification</h2>
                            <p>
                                {' '}
                                For the purposes of transparency, improving
                                trust, or prevention of inappropriate accidents,
                                Briddgy is suggesting its members to go through
                                several verification procedures including email,
                                and phone verification. By clicking “Accept”
                                button and becoming a Member, you agree that the
                                we may send you text (SMS) messages. Briddgy
                                does not charge you for such messages. We are
                                also keeping the right to check or recheck the
                                information provided by the user. In spite of
                                these precautionary measures, Briddgy still
                                cannot guarantee the 100% truthfulness,
                                reliability or validity of the information
                                subject of the verification procedure. In case
                                when Briddgy detects and confirms an inaccuracy
                                in the information provided by the user, the
                                account belonging to that person will be
                                blocked. The person will not be able to use the
                                platform again. Our team will continuously work
                                on improving platform security and come up with
                                the new and better ways of person identification
                                for the better user experience.
                            </p>
                            <h2>5. Use of the social network</h2>
                            <h3> 5.1 Sign up, activation.</h3>
                            <p>
                                {' '}
                                For sign up only email, name and surname are
                                required. To activate the account a member
                                should upload a profile photo. The photo has to
                                belong to the owner of profile. An image
                                processing system will check the picture. In
                                case the photo is not real, the account will not
                                be activated and will not be seen by other
                                members. To place an order or post your trip
                                date phone verification is also mandatory.
                            </p>
                            <h3>5.2 Functionality of Briddgy</h3>
                            <p>
                                After successful sign up, activation and
                                verification all the members have equal rights
                                to utilize Briddgy services. You are free to
                                post your future trip information on the “Add
                                trip” page. Our automatic system will suggest
                                you members who placed an order related to your
                                destination city. Orders could be placed on the
                                “make order” page. The system will suggest you
                                travelers who are planning a trip to the
                                corresponding city at the date indicated in the
                                order. All the members of the Briddgy community
                                can make use of our integrated chat to agree on
                                the details of the order and trip.
                            </p>
                            <h3>5.3 Behavior of users</h3>
                            <p>
                                {' '}
                                You recognize being totally liable
                                for respecting all legal
                                guidelines, regulations and duties applicable to
                                your use of the platform. Furthermore, when
                                using Briddgy you undertake: a. not to post on
                                Briddgy any false, misleading, malicious or
                                fraudulent information; b. not to post any
                                content on the platform of an injurious,
                                defamatory, vulgar, offensive, pornographic,
                                aggressive, obscene, uncalled-for, threatening,
                                violent, harassing, xenophobic or racist nature,
                                or with sexual connotations, inciting violence,
                                hatred or discrimination, the use of illegal
                                substances or encouraging activities; c. not to
                                register more than one profile and not to open
                                an account in the name of a third party; d. not
                                to try to bypass security and verification
                                systems of the platform e. not to contact
                                another member via our website and apps, for
                                purposes other than placing shipment orders and
                                carrying those orders.
                            </p>
                            <h3>5.4 Ratings and trust</h3>
                            <p>
                                {' '}
                                Our platform utilizes a rating system. Members
                                have the right to rate other members with whom
                                they had a deal. The rating consists of a point
                                ranging from 1 to 5 (higher is better). They
                                also can leave comments after each deal. It is
                                expected that members with the higher ratings
                                will earn trust and have more deal offers.
                                Moreover, in order to enhance trust among our
                                members we included one more personality
                                verification layer. In order to get a “verified”
                                status the user will have to upload his picture
                                in a way described further. The face of a user
                                should be clearly visible and fingers placed
                                according to the instruction. This picture is
                                only needed for the verification purposes and
                                will not be used or saved anywhere in our
                                platform. We highly recommend all our users to
                                verify their accounts.
                            </p>
                            <h3>5.5 Prohibited items for sending</h3>
                            <p>
                                <ol>
                                    <li> Stolen property</li>
                                    <li>
                                        {' '}
                                        Firearms, ammunition, explosives
                                        or chemicals
                                    </li>
                                    <li> Pornography or obscene materials</li>
                                    <li>
                                        {' '}
                                        Illegal drugs or regulated drugs
                                        (prescription) in violation of law
                                    </li>
                                    <li>
                                        {' '}
                                        Any item that is prohibited by law
                                        in the place of origin, destination
                                        or any jurisdiction of transit through
                                        between origin and destination
                                    </li>
                                    <li> Knives, batons or other weapons</li>
                                    <li> Counterfeit goods</li>
                                </ol>
                            </p>
                            <h2>6. Undertakings of Briddgy</h2>
                            <p>
                                Briddgy is a social network, mediator and escrow
                                service. It is not held responsible on the
                                transfer of goods between its members. Users are
                                free to set prices and rewards where Briddgy
                                will mediate the transactions. Briddgy will try
                                as much as possible to maintain the website and
                                apps accessible 7 days a week and 24 hours a
                                day. However, access to the social network may
                                be temporarily suspended, without notice, due to
                                technical maintenance.
                            </p>
                            <h2>7. Applicable law</h2>
                            <p>
                                These T&Cs are written in English and subject to
                                English law. You can also, if necessary, present
                                your complaints relative to our Platform or our
                                Services on the dispute resolution platform
                                placed online by the European Commission. The
                                European Commission will send your complaint to
                                the competent national ombudsman. In compliance
                                with the rules applicable to mediation, you are
                                bound, before any request for mediation, to have
                                notified Briddgy in writing of any dispute in
                                order to obtain an amicable solution.
                            </p>
                        
                    </TabPanel>
                    <TabPanel>
                    <h2>1. Information processed by Briddgy.</h2>
                            <p>
                                We provide that service by operating a social
                                network site offering users the opportunity to
                                connect to our global community of users. By
                                joining Briddgy, you enter a legal agreement
                                with us and we process your data in order to
                                provide your service under the terms of that
                                agreement. You can only become a member of
                                Briddgy or use its features if you’re aged 18 or
                                over or the age of majority in the country in
                                which you reside if that happens to be greater
                                than 18.
                                <br />
                                <br />
                                To join the Briddgy network you will have to
                                complete our online registration form, where we
                                may ask you to provide us with information about
                                you such as your name, your email address, your
                                gender, picture or your date of birth, your
                                location details. You also have the opportunity
                                to provide other details about yourself, but
                                these are optional. Because you control your
                                user profile, these details are available to you
                                at any time by accessing your “Profile” page,
                                which gives you the chance to correct or update
                                (other than your email address and gender) your
                                information at any time by just logging in to
                                Briddgy.
                                <br />
                                <br />
                                For safety and security and to ensure you have
                                the best possible user experience, we require
                                users to verify their accounts and might ask for
                                your phone number or image. We want to make sure
                                you are not a robot! And we also want to avoid
                                fake Briddgy accounts being created which can be
                                used for malicious activities and cyber crime –
                                they threaten the Briddgy network and spoil
                                things for everyone. We use a third party
                                provider for account verification who will keep
                                your phone number for up to 90 days for fraud
                                identification purposes. We collect and use your
                                phone number on the basis of our legitimate
                                interests identified above and for the
                                prevention of fraud.
                                <br />
                                <br />
                                To prevent abuse of the app/site, Briddgy uses
                                automated decisions to block accounts as part of
                                its anti-spam procedures. In order to do this,
                                our systems check accounts and messages for
                                content that indicates breaches of our Terms and
                                Conditions of Use. If an account or message
                                meets certain criteria that demonstrate that the
                                Terms and Conditions of Use are likely to have
                                been breached, the relevant account will
                                automatically be blocked. All users of accounts
                                that have been blocked will be notified that
                                their account has been blocked and affected
                                users can contact Briddgy to contest the
                                decision.
                                <br />
                                <br />
                                Please note that if your account is blocked, any
                                account(s) that you have on our other group
                                platforms/applications may also be blocked as
                                part of our anti-spam and anti-fraud procedures.
                                <br />
                                <br />
                                If you decide to purchase any of our premium
                                services, we will process your payment
                                information and retain this securely for the
                                prevention of fraud and for audit/tax purposes.
                                Under data protection law, it is necessary for
                                us to collect and process this payment data to
                                enable us to perform our contract with you and
                                our ongoing retention of this data is justified
                                by our legitimate interests set out above.
                                <br />
                                <br />
                                To enable Briddgy to provide a free non-premium
                                service, we process some limited data
                                (demographics and location) to drive targeted
                                advertising in our legitimate interest including
                                sharing such data with advertising networks. We
                                may also receive data indirectly from such
                                advertising networks. You can stop this within
                                Settings but you will still see adverts, though
                                they will be less relevant to you. Through your
                                device’s security settings you also have the
                                option to prevent or limit device identifiers
                                being shared with third party advertisers and
                                what use is made of the device identifiers. If
                                you would like more information about this
                                practice and to know your choices about not
                                having this information used by these companies,
                                please visit this page.
                                <br />
                                <br />
                                Finally, we want to keep in touch with you to
                                make sure you know about the great promotions
                                and offers we have available. If you’ve told us
                                it’s OK, we will use your email address and
                                phone number to send you information on these.
                                You can withdraw this consent at any time via
                                Settings in the app or website.
                            </p>
                            <h2>2. Information collected through the app.</h2>
                            <p>
                                {' '}
                                Briddgy offers you the opportunity to stay in
                                touch with the friends and contacts you’ve made
                                no matter where you are. You can do this by
                                using your mobile phone or by downloading an
                                application to your desktop that allows you to
                                share your location with other users.
                                <br />
                                <br />
                                When you use your mobile or the desktop
                                application, we will collect information about
                                WiFi access points as well as other location
                                information about your longitude and latitude.
                                That information helps us identify your physical
                                location so that it can be displayed and shared
                                with other members choosing to view “nearby”
                                posts. I<br />
                                <br />f you have enabled location services, but
                                wish to turn them off, you can do so by the
                                following methods:
                                <br />
                                <br />
                                1. iPhone app — settings, privacy, location
                                services, Briddgy
                                <br />
                                <br />
                                2. Android — settings, location, Briddgy,
                                permissions, location
                                <br />
                                <br />
                                We, or our third-party advertising partners, may
                                also collect and use your device identifier to
                                serve relevant ads to you through the App. You
                                can opt out of targeted advertising by (i)
                                becoming a payer and/ or (ii) opting not to
                                share data with any partner platforms but still
                                to receive advertisements.
                                <br />
                                <br />
                                If you log in to or access Briddgy through your
                                Facebook profile, we may collect data including
                                your email address, name and profile picture,
                                date of birth, a list of your friends who also
                                use the app, pages you have liked, location and
                                photos in order to create and update your
                                Briddgy profile. You may also appear on your
                                friends’ Facebook apps as a Briddgy user.
                            </p>
                            <h2>3. Legal basis for using your information.</h2>
                            <p>
                                We are only permitted to use your data when we
                                have a lawful basis to do so. The table below
                                provides an overview of the legal bases that
                                Briddgy relies on to use your data. Where the
                                legal basis is consent, you can withdraw consent
                                at any time. Where the legal basis is legitimate
                                interests, you have a right to object to our use
                                of your data. We explain in the relevant
                                sections in this privacy notice how you can
                                withdraw consent or opt-out of certain data uses
                                (where applicable).
                            </p>
                            <table>
                                <tr>
                                    <th>Purpose</th>
                                    <th>Data</th>
                                    <th>Legal Basis</th>
                                </tr>
                                <tr>
                                    <td>
                                        To provide you with the Briddgy social
                                        networking service
                                    </td>
                                    <td>
                                        Name, email address, date of birth,
                                        location
                                    </td>
                                    <td>Contractual necessity</td>
                                </tr>
                                <tr>
                                    <td>
                                        To verify your identity and prevent
                                        fraud and to ensure the safety and
                                        security of users
                                    </td>
                                    <td>Phone number</td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to ensure that
                                        accounts are not set up fraudulently and
                                        to safeguard users of the site
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To take payment for premium services
                                    </td>
                                    <td>Payment card details</td>
                                    <td>
                                        Contractual necessity and legitimate
                                        interests – we have a legitimate
                                        interest in receiving payment for our
                                        premium services
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To serve targeted advertisements to
                                        users of the site/app
                                    </td>
                                    <td>
                                        Demographic and location information
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to target
                                        advertisements so that users see
                                        relevant advertisements and to allow us
                                        to generate income from advertising
                                        revenue
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To send you marketing information about
                                        our offers and services
                                    </td>
                                    <td>
                                        Email address and mobile phone number
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to promote our
                                        products and services
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To contact you in order to run surveys
                                        for research purposes and to obtain
                                        feedback
                                    </td>
                                    <td>
                                        Email address and mobile phone number
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to carry out
                                        research so that we can further develop
                                        the app and improve the service
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To enable users to create their Briddgy
                                        profile and log into the app via
                                        Facebook
                                    </td>
                                    <td>
                                        Data from Facebook, including email
                                        address, name and profile picture, date
                                        of birth, friends who use the app, pages
                                        liked, location and photos
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to promote our
                                        products and services
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To show “nearby” location information to
                                        you and other users of the site/app
                                    </td>
                                    <td>
                                        Wifi access points and location data
                                        when you use the mobile app
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to provide this
                                        functionality as part of the services
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To serve advertisements through the
                                        Briddgy mobile app
                                    </td>
                                    <td>Device ID</td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests and the interests
                                        of third party advertisers to deliver
                                        advertisements to you to promote their
                                        products
                                    </td>
                                </tr>
                                <tr>
                                    <td>To provide the lookalikes function</td>
                                    <td>Photos and faceprint</td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to provide this
                                        functionality
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To carry out analysis to help us improve
                                        the app
                                    </td>
                                    <td>
                                        Log and usage data, including IP
                                        address, browser type, referring domain,
                                        pages accessed, mobile carrier and
                                        search terms
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        interests to analyse the way in which
                                        users are accessing and using our
                                        services so that we can further develop
                                        the app and improve the service
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To respond to correspondence and queries
                                        that you submit to us
                                    </td>
                                    <td>Email address and IP address</td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to respond to your
                                        queries to ensure that we provide a good
                                        service to users and troubleshoot
                                        problems
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To block accounts as part of our
                                        anti-spam procedures{' '}
                                    </td>
                                    <td>
                                        Email address, phone number, IP address
                                        and IP session information, social
                                        network ID, username, faceprint, user
                                        agent string{' '}
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to prevent
                                        unauthorised behaviour and to maintain
                                        the safety and security of our services{' '}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        To block payment transactions as part of
                                        our anti-fraud procedures{' '}
                                    </td>
                                    <td>
                                        Name, IP address, email address, mobile
                                        number, cardholder name, payments
                                        received, type of payment, user ID,
                                        country{' '}
                                    </td>
                                    <td>
                                        Legitimate interests – it is in our
                                        legitimate interests to prevent
                                        fraudulent transactions and to maintain
                                        the security of our services{' '}
                                    </td>
                                </tr>
                            </table>
                            <h2>4. Information Storage Period</h2>
                            <p>
                                We keep your personal information only as long
                                as we need it for legitimate business purposes
                                (as set out above) and as permitted by
                                applicable law.
                                <br />
                                <br />
                                In practice, we delete or anonymise your
                                information upon deletion of your account
                                (following the safety retention window), unless:
                                <ol>
                                    <li>
                                        we must keep it to comply with
                                        applicable law (for instance, some
                                        “traffic data” is kept for one year to
                                        comply with statutory data retention
                                        obligations)
                                    </li>
                                    <li>
                                        we must keep it to evidence our
                                        compliance with applicable law (for
                                        instance, records of consents to our
                                        Terms, Privacy Policy and other similar
                                        consents are kept for five years)
                                    </li>
                                    <li>
                                        there is an outstanding issue, claim or
                                        dispute requiring us to keep the
                                        relevant information until it is
                                        resolved; or
                                    </li>
                                    <li>
                                        the information must be kept for our
                                        legitimate business interests, such as
                                        fraud prevention and enhancing users'
                                        safety and security. For example,
                                        information may need to be kept to
                                        prevent a user who was banned for unsafe
                                        behaviour or security incidents from
                                        opening a new account.
                                    </li>
                                </ol>
                                Where Briddgy uses machine learning, for
                                example, to help us detect and prevent
                                fraudulent card transactions, and to detect and
                                prevent spam communications on the App (as
                                explained above), we may need to keep personal
                                information for a longer period than the
                                retention periods explained above, to enable the
                                machine learning to work properly. Where this is
                                the case, we always seek to minimise the amount
                                of personal information that is used and we
                                ensure that it is ring-fenced and kept securely
                                from other user personal information. We
                                regularly review the period for which personal
                                information is required for machine learning
                                purposes and delete any identifiable information
                                when it is no longer required.
                            </p>
                            <h2>5. Sharing and Collection of Data</h2>
                            <p>
                                We may share aggregated information with such
                                parties as Foursquare that includes your
                                personal data (but which doesn’t identify you
                                directly), together with other information
                                including log data with third parties for
                                industry analysis and demographic profiling and
                                to deliver targeted advertising about other
                                products and services.
                                <br />
                                <br />
                                We share your data with the following categories
                                of third-parties:
                                <ol>
                                    <li>
                                        Information technology companies
                                        (hardware and software) which provide
                                        services to support our products
                                    </li>
                                    <li>
                                        Fraud prevention and anti-spam providers
                                        to protect the service from criminal
                                        activity
                                    </li>
                                    <li>
                                        Moderators to monitor activity on the
                                        site/apps and approve content
                                    </li>
                                    <li>
                                        Advertising partners, market places and
                                        providers of targeted advertising,
                                        including, but not limited to, MoPub
                                        Inc. (you can view MoPub’s privacy
                                        policy at
                                        https://www.mopub.com/legal/privacy/ and
                                        its partner list at
                                        https://www.mopub.com/legal/partners/)
                                        and Unity Technologies SF (you can view
                                        Unity’s privacy policy at
                                        https://unity3d.com/legal/privacy-policy).
                                    </li>
                                    <li>
                                        Law enforcement agencies, where we are
                                        required to by law or to protect the
                                        vital interests of a person
                                    </li>
                                    <li>
                                        Payment processing and
                                        telecommunications companies to
                                        facilitate payments for our premium
                                        services
                                    </li>
                                </ol>
                                We ensure these parties must adhere to strict
                                data protection and confidentiality provisions
                                that are consistent with this Policy. Measures
                                are taken to ensure that the data shared is
                                non-attributable to the greatest extent
                                possible.
                                <br />
                                <br />
                                In the event that Briddgy or any of its
                                affiliates undergoes a business transition or
                                change of ownership, such as a merger,
                                acquisition by another company, re-organisation,
                                or sale of all or a portion of its assets, or in
                                the event of insolvency or administration, we
                                may be required to disclose your personal data.
                            </p>
                    </TabPanel>
                    <TabPanel>
                    <h2>SERVICE CONTRACT</h2>
                            <p>
                                This agreement (hereinafter referred to as the
                                "Agreement"), on the one hand, established in
                                accordance with the legislation of the Republic
                                of Azerbaijan, "BRIDDGY" LLC (hereinafter
                                referred to as "Mediator"), on the other hand,
                                providing services (hereinafter referred to as
                                "Executor") and recipient of services from the
                                other party (hereinafter - Will be called
                                "Customer"), in a tripartite form between the
                                parties (hereinafter referred to as the
                                "Parties"), subject to the following conditions.
                            </p>
                            <h3>1. SUBJECT OF THE CONTRACT</h3>
                            <p>
                                1.1. The Customer has ordered the import
                                (transportation) of personal consumer goods
                                (items) belonging to him (or third parties) from
                                any foreign country for a fee, placing the
                                relevant order announcement on the online
                                specialized service portal created by the
                                Intermediary for this purpose and transportation
                                the Executor (or the Executor's transportation
                                service, the Intermediary's placement of the
                                offer for the said service on its portal, the
                                Customer's own (or third-party) personal
                                consumer goods (goods) from any foreign country
                                (ordering the delivery (transportation) with
                                payment), undertakes the transportation of the
                                ordered item.
                                <br /> 1.2. The scope, features, specific
                                information and the amount of the Service Fee
                                shall be determined by agreement in accordance
                                with the relevant clause of this Agreement.{' '}
                                <br />
                                1.3. The service shall be provided for the
                                period agreed by the Parties in paragraph 6 of
                                this Agreement.
                            </p>
                            <h3>2. SERVICE PROCEDURE (EXECUTION OF WORK)</h3>
                            <p>
                                2.1. The provision of the service begins with
                                the placement of the relevant advertisement in
                                the specialized online service of the Customer
                                in order to find the Executor (or the Customer
                                on the possibility of paid transportation of
                                personal consumer goods (items) in connection
                                with the paid transportation of the Customer's
                                personal consumer goods (items).
                                <br />
                                2.2. The Customer provides all information on
                                the specific features, scope and duration of the
                                service to be purchased (to be provided by the
                                Executor) online by posting it on the
                                Customers's specialized website for the relevant
                                service.
                                <br />
                                2.3. The Mediator places the Customer's
                                transportation service order (Executor's
                                transportation service offer) on its relevant
                                specialized online service page, provides
                                security and monitors the implementation of the
                                service.
                                <br />
                                2.4. Service is provided in this Agreement upon
                                the accurate information of Customer, Mediator,
                                Executor, persons to whom the item will be
                                picked up and delivered, their contact details
                                and addresses (name, surname, serial number of
                                the company, telephone number, e-mail address,
                                residential address, agreed delivery) address)
                                <br />
                                2.5. The executor performs the agreed service
                                with quality and within the established time.
                            </p>
                            <h3>
                                3. OBLIGATIONS AND RESPONSIBILITIES OF THE
                                PARTIES
                            </h3>
                            <p>
                                3.1. Obligations of the customer:
                                <br />
                                3.1.1. Information about himself and his means
                                of communication, the person and address (name,
                                surname, serial number of the company, business
                                phone number, e-mail address, residential
                                address, address where the item will be picked
                                up and delivered) to which the item is to be
                                picked up and delivered to provide a complete
                                and accurate information to the operator of the
                                specialized online internet service. <br />{' '}
                                3.1.2. To place complete and accurate
                                information on the subject of the order (name,
                                type, model, volume, weight, physical condition,
                                storage condition, storage conditions, etc.) on
                                the online website of the specialized service of
                                the Mediator. <br />
                                3.1.3. To place full and accurate information on
                                the addresses (country, province, city,
                                district, index, etc.) where the subject of the
                                order will be picked up and delivered on the
                                online website of the specialized service of the
                                Mediator. <br />
                                3.1.4. Check and receive the result of the order
                                service; <br />
                                3.1.5. Pay the order service correctly and on
                                time to the bank account (or card) specified by
                                the Mediator.
                                <br />
                                3.2. Obligations of the mediator:
                                <br />
                                3.2.1. To collect information about the
                                Customer's (as well as the Executor's) personal
                                and contact means (name, surname, serial number
                                of the company, telephone number, e-mail
                                address, residential address) in the relevant
                                electronic database for the purposes of the
                                Service. <br />
                                3.2.2. Provide the secure facility to collect
                                the details of the item that is subject of
                                order(as well as the service
                                provided)(name,type,model,volume,physical
                                condition,storage condition and etc.) and the
                                delivery that is subject of order(also picked-up
                                and delivered)(country,province,city,
                                district,index and etc.) <br />
                                3.2.3. Not to disclose in full the personal
                                Customer's (as well as the Executor's) personal,
                                contact information, the subject of the order
                                (as well as transportation services) and the
                                addresses where it will be picked up and
                                delivered (as well as picked up and delivered)
                                without the Client's permission.
                                <br /> 3.2.4. To monitor the quality and full
                                implementation of the terms of this agreement by
                                its Parties.
                                <br />
                                3.2.5. Submit the relevant online bank account
                                (or card information) to the Customer to pay the
                                service fee. <br />
                                3.2.6. To transfer the agreed part of the amount
                                paid as a service fee to the Executor.
                                <br />
                                3.3. Responsibilities of executor:
                                <br /> 3.3.1. To provide complete and accurate
                                information about himself and his means of
                                communication (name, surname, serial number of
                                the company, telephone number, e-mail address,
                                residential address) to the operator of the
                                specialized online service. <br />
                                3.3.2. To place full and accurate information on
                                the items for which the transportation service
                                can be performed (name, type, model, volume,
                                weight, physical condition, storage condition,
                                storage conditions, etc.) on the online website
                                of the specialized service of the Mediator.
                                <br /> 3.3.3. To place full and accurate
                                information on the addresses where the goods can
                                be picked up and delivered (country, province,
                                city, district, index, etc.) on the online
                                website of the specialized service of the Broker
                                in order to carry out the service of
                                transportation of goods. <br />
                                3.3.4. Not to disclose information about the
                                customer's identity, means of communication, the
                                subject of the order and the persons and
                                addresses where it will be picked up and
                                delivered. <br />
                                3.3.5. To fulfill the order qualitatively and in
                                time (within the period) agreed by the Parties
                                to this Agreement. <br />
                                3.3.6. To bear financial responsibility for the
                                damage caused to the Customer's property due to
                                the fault of the Contractor and for failure to
                                perform the transportation in due time.
                                <br /> 3.3.7. To pay customs and other expenses
                                related to the transportation of the subject of
                                the order.
                            </p>
                            <h2>4. RIGHTS OF THE PARTIES</h2>
                            <p>
                                4.1. Customer rights: <br />
                                4.1.1. About the subject of the order (name,
                                type, model, volume, weight, physical condition,
                                storage condition, storage conditions, etc.) and
                                about the addresses where the subject of the
                                order will be picked up and delivered (country,
                                province, city, district, index, etc.) .) to
                                require the placement and technical protection
                                of information on the online website of the
                                specialized service of the Mediator.
                                <br /> 4.1.2. Require the Mediator to provide
                                the appropriate online bank account (or card
                                information) to pay the service fee.
                                <br /> 4.1.3. Require the Mediator and the
                                Executor not to disclose information about the
                                Customer's identity, means of communication, the
                                subject of the order and the persons and
                                addresses to which it will be picked up and
                                delivered. <br />
                                4.1.4. Require the Executor to fulfill the order
                                in a quality and timely manner within the period
                                agreed by the Parties to this Agreement.
                                <br /> 4.1.5. To demand compensation from the
                                executor for the damage caused to his property
                                due to his fault and for the delay in
                                transportation.
                                <br /> 4.1.6. Check and receive the results of
                                the service;
                                <br />
                                4.2. Mediator's rights:
                                <br /> 4.2.1. Requite complete and accurate
                                information to the operator of the specialized
                                online internet service from the Customer (as
                                well as the Executor) himself and means of
                                communication, the person and address (name,
                                surname, serial number of the company, working
                                phone number, e-mail) to which the subject of
                                the order will be picked up and delivered (as
                                well as picked up and delivered) address,
                                residential address, address where the item will
                                be picked up and delivered).
                                <br /> 4.2.2. Require the Customer and the
                                Executor to place complete and accurate
                                information on the subject of the order (as well
                                as the offered service) (name, type, model,
                                volume, weight, physical condition, storage
                                condition, storage conditions, etc.) on the
                                online website of the specialized service of the
                                Mediator make. <br />
                                4.2.3. Complete and accurate posting of
                                information on the addresses (country, province,
                                city, district index, etc.) on the online
                                website of the Mediator's specialized service To
                                demand from the executor. <br />
                                4.2.4. Require the Customer to pay the order
                                service correctly and on time to the online bank
                                account (or card) provided by the Mediator.
                                <br />
                                4.2.5. Require the parties to fulfill their
                                obligations under the Agreement in a quality and
                                complete manner.
                                <br />
                                4.3. Executor's rights:
                                <br /> 4.3.1. Demand the placement and technical
                                protection about the item that can be
                                transported (performed service) (name, type,
                                model, volume, weight, physical condition,
                                storage condition, storage conditions, etc.) and
                                about the addresses where the object of service
                                can be picked up and delivered (country, region,
                                city, district, index, etc.) on the online
                                website of the specialized service of the
                                Mediator.
                                <br /> 4.3.2. Require the Mediator to pay the
                                service fee correctly and on time to the online
                                bank account (or card) specified by the
                                Executor. <br />
                                4.3.3. The customer and the means of
                                communication, the person and address (name,
                                surname, serial number of the company, business
                                phone number, e-mail address, residential
                                address, address where the item will be picked
                                up and delivered) and the item to be picked up
                                and delivered; to demand from the Customer to
                                provide him with complete and accurate
                                information about (name, type, model, volume,
                                weight, physical condition, storage condition,
                                storage conditions, etc.).
                            </p>
                            <h3>5. FEE CALCULATION RULES</h3>
                            <p>
                                5.1. The scope of services provided shall be
                                determined by agreement of the Parties and the
                                service fee for the provision of services shall
                                be specified in this Agreement.
                                <br /> 5.2. Settlements under this Agreement are
                                made by transfer to an online bank account (or
                                card).
                                <br /> 5.3 Settlements are made in Azerbaijani
                                manats (AZN).
                            </p>
                            <h3>6. TERM OF CONTRACT</h3>
                            <p>
                                6.1. This Agreement shall be valid for the
                                period of import (transportation) of goods
                                (items) for personal consumption from any
                                foreign country (on the dates specified herein).
                                <br />
                                6.2. With the written consent and notifications
                                of the parties, the term of the contract may be
                                reduced or a new contract may be concluded.
                            </p>
                            <h3>7. FORCE MAJOURE</h3>
                            <p>
                                7.1. A Party that fails to perform its
                                obligations under this Agreement and fails to do
                                so shall have no obligation or liability if it
                                proves that its failure is due to force majeure,
                                ie unavoidable emergencies occurring within a
                                specified time frame. Unavoidable situations
                                are: natural disasters (earthquakes, floods,
                                volcanic eruptions, landslides, tsunamis, etc.);
                                Wind strength, air temperature and sedimentation
                                rate, excluding normal human activities at the
                                place of performance of contractual obligations;
                                moratoriums of the executive authorities,
                                military operations and other circumstances that
                                the Parties may designate as an emergency for
                                the obligations to be performed.
                                <br /> 7.2. A Party affected by force majeure
                                shall notify the other Party thereof at the
                                earliest opportunity. Failure to notify the
                                other party in time does not give the right to
                                rely on force majeure.
                            </p>
                            <h3>8. AMENDMENTS TO CONTRACT</h3>
                            <p>
                                8.1. All additions and changes to this Agreement
                                may be made at the written request of the
                                interested party and by mutual consent of the
                                parties. <br />
                                8.2. Additions and amendments to this Agreement
                                shall be formalized by the Supplementary
                                Agreement, which is an integral part of it.
                                <br /> 8.3. This Agreement may be terminated in
                                accordance with the procedure and in the cases
                                provided for in the Civil Code of the Republic
                                of Azerbaijan.
                            </p>
                            <h3>9. RESOLUTION OF DISPUTES</h3>
                            <p>
                                9.1. All disputes arising out of this Agreement
                                shall be settled through negotiations. <br />
                                9.2 Disputes under this Agreement shall be
                                settled amicably between the parties. <br />
                                9.3. If the disputes between the parties are not
                                resolved in accordance with Article 9.2, the
                                disputes shall be regulated by the legislation
                                of the Republic of Azerbaijan and the disputes
                                shall be considered in the relevant courts of
                                the Republic of Azerbaijan.
                            </p>
                            <h3>10. RESPONSIBILITY OF PARTIES</h3>
                            <p>
                                10.1. In case of non-fulfillment or improper
                                fulfillment of the obligations provided for in
                                this Agreement, the guilty party shall
                                compensate the injured party for the damage
                                caused as a result of non-fulfillment of
                                obligations in accordance with the civil
                                legislation of the Republic of Azerbaijan.
                                <br /> 10.2. Only the guilty Party (or the
                                Parties) shall be liable for the shipment
                                (transportation) of illicit goods.
                            </p>
                            <h3>11. FINAL PROVISIONS</h3>
                            <p>
                                10.1. Provisions not regulated by this Agreement
                                shall be governed by the laws of the Republic of
                                Azerbaijan. <br />
                                10.2. Amendments and additions to this Agreement
                                shall be made by the signing of the Agreement on
                                Amendments and Additions by the Parties in the
                                form of a single written document. 10.3. This
                                Agreement consists of 5 (five) pages, each of
                                which has the same legal force and is drawn up
                                in triplicate, one copy for each Party.
                            </p>
                    </TabPanel>
                </TabPanels>




            </Tabs>
        </Container>

      <Footer/>
        </>
    )

}


export default TermsAndConditions