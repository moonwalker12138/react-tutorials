import React, { useEffect, useRef } from 'react'
import styles from "./CodeWrapper.module.css";
import hljs from "highlight.js";

interface IProps {
	code: string;
}

export const CodeWrapper:React.FC<IProps> = ({code}) => {
	const ref = useRef<HTMLPreElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		hljs.highlightBlock(ref.current);
	}, []);

	return (
		<pre ref={ref} className={styles.codeWrapper}>
			<code>
				{code}
			</code>
		</pre>
	)
}
