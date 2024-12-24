import { useState } from 'react';
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';
import styles from './_index.module.scss';
import styles0 from './route.module.scss';
import GymIconCopy1Png from '../../../src/assets/gym_icon_copy1.png';
import OfficeIconPng from '../../../src/assets/office_icon.png';
import SchoolIconPng from '../../../src/assets/school_icon.png';
import HotelIconPng from '../../../src/assets/hotel_icon.png';
import data from './data';
import classNames from 'classnames';

export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
    const [facilityLocation, setFacilityLocation] = useState('');
    const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const segmentData = selectedSegment ? data[selectedSegment as keyof typeof data] : {};

    const segmentClick = (segmentName: string) => {
        setSelectedSegment(segmentName);
        setIsNextEnabled(true);
    };

    const handleTransition = (direction: 'left' | 'right', pageUpdate: () => void) => {
        if (isTransitioning) return;
        setTransitionDirection(direction);
        setIsTransitioning(true);

        setTimeout(() => {
            pageUpdate();
            setTransitionDirection(null);
        }, 500);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 1000);
    };

    const handleNext = () => {
        if (currentPage < 4) {
            let isNextEnabled = false;

            if (currentPage === 1) {
                isNextEnabled = Object.values(inputValues).some((val) => val !== 0);
            } else if (currentPage === 2) {
                isNextEnabled = facilityLocation.trim() !== '';
            }
            setIsNextEnabled(isNextEnabled);

            handleTransition('right', () => {
                setCurrentPage((prev) => prev + 1);
            });
        } else if (currentPage === 3) {
            setIsNextEnabled(false);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            handleTransition('left', () => {
                setCurrentPage((prev) => prev - 1);
            });
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, itemName: string) => {
        let value = parseInt(event.target.value, 10);

        if (value < 0) {
            value = 0;
        }

        setInputValues((prevState) => {
            const updatedValues = { ...prevState, [itemName]: value };
            const hasNonZeroValue = Object.values(updatedValues).some((val) => val !== 0);

            setIsNextEnabled(currentPage === 2 ? hasNonZeroValue : false);

            return updatedValues;
        });
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.value = '';
    };

    const handleFacilityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFacilityLocation(value);

        setIsNextEnabled(value.trim() !== '');
    };

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div className={styles0.contentPage}>
                        <h1 className={styles0.pageTitle}>Select Segment</h1>
                        <div className={styles0.segmentContainer}>
                            {[
                                { name: 'Gym', icon: GymIconCopy1Png },
                                { name: 'Office', icon: OfficeIconPng },
                                { name: 'School', icon: SchoolIconPng },
                                { name: 'Hotel', icon: HotelIconPng },
                            ].map(({ name, icon }) => (
                                <button
                                    key={name}
                                    className={`${styles0.segmentButton} ${
                                        selectedSegment === name ? styles0.activeSegment : ''
                                    }`}
                                    onClick={() => segmentClick(name)}
                                >
                                    <img src={icon} alt="" className={styles0.segmentImage} />
                                    <span className={styles0.segmentName}>{name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles0.contentPage}>
                        <h1 className={styles0.pageTitle}>Select Quantity</h1>
                        <div className={styles0.segmentScroll}>
                            {Object.keys(segmentData).map((itemName) => (
                                <div key={itemName} className={styles0.quantityElement}>
                                    <span className={styles0.quantityName}>{itemName}</span>
                                    <input
                                        type="number"
                                        className={styles0.quantityInput}
                                        value={inputValues[itemName] || 0}
                                        onFocus={handleFocus}
                                        onChange={(e) => handleInputChange(e, itemName)}
                                        onBlur={(e) =>
                                            (e.target.value = (
                                                inputValues[itemName] || 0
                                            ).toString())
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles0.topFade} />
                        <div className={styles0.bottomFade} />
                    </div>
                );
            case 3:
                return (
                    <div className={styles0.contentPage}>
                        <h1 className={styles0.pageTitle}>Facility Location</h1>
                        <input
                            className={styles0.facilityInput}
                            placeholder="123 Energy Saving Ave, Brunswick, Maine"
                            value={facilityLocation}
                            onChange={handleFacilityInput}
                        />
                    </div>
                );
            case 4:
                return (
                    <div className={styles0.contentPage}>
                        <h1 className={styles0.pageTitle}>Estimated Savings</h1>
                        <div className={styles0.annualPanel}>
                            <span className={styles0.savingsTitle}>Annual Gross</span>
                            <div className={styles0.annualResultsContainer}>
                                <span className={styles0.annualMoney}>$0.00</span>
                                <span className={styles0.annualPlugs}>using 0 plugs</span>
                            </div>
                        </div>
                        <div className={styles0.monthlyPanel}>
                            <span className={styles0.savingsTitle}>Monthly </span>
                            <div className={styles0.calculationContainer}>
                                <span className={styles0.calculationEntry}>
                                    + Monthly Savings ($0)
                                </span>
                                <span className={styles0.calculationEntry}>- Gain Share ($0)</span>
                                <div className={styles0.calculationLine} />
                                <span className={styles0.calculationEntry}>+ $0</span>
                            </div>
                        </div>
                        <div className={styles0.actionCall}>
                            <span className={styles0.savingsTitle}>Plug in. Start Saving.</span>
                            <p className={styles0.p1}>
                                Revert Technologies&apos; AI powered energy saving platform cuts
                                electricity bills by turning equipment all the way off. Just plug in
                                to save!
                            </p>
                            <button className={styles0.orderButton}>ORDER &gt;&gt;</button>
                        </div>
                    </div>
                );
            default:
                return <div>Unknown Page</div>;
        }
    };

    return (
        <div className={styles.root}>
            <img
                src="https://reverttechnologies.com/cdn/shop/files/b2.png?v=1730099475"
                className={styles0.bannerImage}
            />
            <div className={styles0.contentContainer}>
                <div
                    className={classNames(
                        styles0.transitionContainer,
                        transitionDirection === 'right' && styles0.slideOutRight,
                        transitionDirection === 'left' && styles0.slideOutLeft,
                        transitionDirection === null && styles0.slideIn
                    )}
                >
                    {renderContent()}
                </div>

                <div
                    className={`${styles0.navigationBar} ${
                        currentPage === 4 ? styles0.slideOut : ''
                    }`}
                >
                    <button
                        className={styles0.backButton}
                        disabled={currentPage === 1}
                        onClick={handleBack}
                    >
                        Back
                    </button>

                    <div
                        className={
                            selectedSegment
                                ? `${styles0.progressCircle} ${styles0.progressCircleActive}`
                                : styles0.progressCircle
                        }
                    >
                        <span
                            className={classNames(
                                styles0.progressName,
                                currentPage === 1 ? styles0.fontHighlight : styles0.fontNolight
                            )}
                        >
                            Segment
                        </span>
                    </div>

                    <div className={styles0.separatorLine} />

                    <div
                        className={
                            Object.values(inputValues).some((val) => val !== 0)
                                ? `${styles0.progressCircle} ${styles0.progressCircleActive}`
                                : styles0.progressCircle
                        }
                    >
                        <span
                            className={classNames(
                                styles0.progressName,
                                currentPage === 2 ? styles0.fontHighlight : styles0.fontNolight
                            )}
                        >
                            Quantity
                        </span>
                    </div>

                    <div className={styles0.separatorLine} />

                    <div
                        className={
                            facilityLocation.trim() !== ''
                                ? `${styles0.progressCircle} ${styles0.progressCircleActive}`
                                : styles0.progressCircle
                        }
                    >
                        <span
                            className={classNames(
                                styles0.progressName,
                                currentPage === 3 ? styles0.fontHighlight : styles0.fontNolight
                            )}
                        >
                            Location
                        </span>
                    </div>

                    <button
                        className={
                            isNextEnabled ? styles0.nextButtonEnabled : styles0.nextButtonDisabled
                        }
                        disabled={!isNextEnabled}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const title = 'Web Concept - V2';
    const description = 'Revert Technologies';
    const imageUrl = 'https://reverttechnologies.com/cdn/shop/files/RVT-Hor-Logo-Neg_240x.png';

    return [
        { title },
        {
            name: 'description',
            content: description,
        },
        {
            tagName: 'link',
            rel: 'canonical',
            href: data?.canonicalUrl,
        },
        {
            property: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:title',
            content: title,
        },
        {
            property: 'og:description',
            content: description,
        },
        {
            property: 'og:image',
            content: imageUrl,
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: title,
        },
        {
            name: 'twitter:description',
            content: description,
        },
        {
            name: 'twitter:image',
            content: imageUrl,
        },
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: 'icon',
            href: '/favicon.ico',
            type: 'image/ico',
        },
    ];
};
