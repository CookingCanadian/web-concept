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
    const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

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
        if (currentPage < 3) {
            handleTransition('right', () => {
                setCurrentPage((prev) => prev + 1);
                setIsNextEnabled(currentPage === 1 ? !!selectedSegment : false);
            });
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            handleTransition('left', () => {
                setCurrentPage((prev) => prev - 1);
            });
        }
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
                            <div className={styles0.quantityElement}>
                                <span className={styles0.quantityName}>Quantity Name</span>
                                <input type="number" className={styles0.quantityInput} />
                            </div>
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

                <div className={styles0.navigationBar}>
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
                        <span className={styles0.span1}>Segment</span>
                    </div>
                    <div className={styles0.separatorLine} />
                    <div className={styles0.progressCircle}>
                        <span className={styles0.span1}>Quantity</span>
                    </div>
                    <div className={styles0.separatorLine} />
                    <div className={styles0.progressCircle}>
                        <span className={styles0.span1}>Location</span>
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
