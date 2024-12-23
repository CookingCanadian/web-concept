import { LinksFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getUrlOriginWithPath } from '~/utils';
import styles from './_index.module.scss';
import styles0 from './route.module.scss';
import OfficeIconPng from '../../../src/assets/office_icon.png';
import SchoolIconPng from '../../../src/assets/school_icon.png';
import HotelIconPng from '../../../src/assets/hotel_icon.png';
import GymIconCopy1Png from '../../../src/assets/gym_icon_copy1.png';

export const loader = ({ request }: LoaderFunctionArgs) => {
    return { canonicalUrl: getUrlOriginWithPath(request.url) };
};

export default function HomePage() {
    return (
        <div className={styles.root}>
            <img
                src="https://reverttechnologies.com/cdn/shop/files/b2.png?v=1730099475"
                alt=""
                className={styles0.bannerImage}
            />
            <div className={styles0.contentContainer}>
                <h1 className={styles0.pageTitle}>Select Segment</h1>
                <div className={styles0.segmentContainer}>
                    <div className={styles0.segmentBlock}>
                        <img src={GymIconCopy1Png} alt="" className={styles0.segmentImage} />
                        <span className={styles0.segmentName}>Gym</span>
                    </div>
                    <div className={styles0.segmentBlock}>
                        <img src={OfficeIconPng} alt="" className={styles0.segmentImage} />
                        <span className={styles0.segmentName}>Office</span>
                    </div>
                    <div className={styles0.segmentBlock}>
                        <img src={SchoolIconPng} alt="" className={styles0.segmentImage} />
                        <span className={styles0.segmentName}>School</span>
                    </div>
                    <div className={styles0.segmentBlock}>
                        <img src={HotelIconPng} alt="" className={styles0.segmentImage} />
                        <span className={styles0.segmentName}>Hotel</span>
                    </div>
                </div>
                <div className={styles0.navigationBar}>
                    <button className={styles0.backButton}>Back</button>
                    <div className={styles0.progressCircle}>
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
                    <button className={styles0.nextbutton}>Next</button>
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
