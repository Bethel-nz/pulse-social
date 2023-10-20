import React from 'react';

type Params = {
	params: {
		slug: string;
	};
};

export default function page({ params: { slug } }: Params) {
	return <div>{slug}</div>;
}
