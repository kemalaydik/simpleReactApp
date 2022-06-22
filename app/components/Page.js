import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Page(props) {
	useEffect(() => {
		document.title = `${props.title} | React App`;
		window.scrollTo(0, 0);
	}, [props.title]);
	return <>{props.children}</>;
}

export default Page;
