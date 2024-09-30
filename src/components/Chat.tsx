const Chat = ({ isUser=true, userPrompt = "", message = "", loading = false }) => {
	const createMarkup = (htmlString: string) => {
		return { __html: htmlString };
	};
	return (
		<>
			{isUser ? (
				<div className="flex gap-5 justify-start items-center pt-5 text-slate-100 font-roboto">
					<img
						src={'/user.png'}
						className="m-4"
						alt="user-profile-img"
						width={35}
						height={35}
					/>
					<span className="">{userPrompt}</span>
				</div>
			) : (
				<div className="flex items-center justify-start gap-5 font-roboto mt-5 font-medium tracking-[0.04rem]">
					<img src={'/water-icon.png'} alt="logo" className="m-4" width={35} height={35} />
					<div
						className="flex flex-col items-start"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={createMarkup(message)}
					/>
				</div>
			)}
		</>
	);
};

export default Chat;
