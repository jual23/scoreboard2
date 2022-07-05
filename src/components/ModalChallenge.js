const ModalChallenge = ({
    challenge,
    setChallenge,
    loseChallenge,
    winChallenge,
}) => {
    return (
        <div>
            <button onClick={() => winChallenge(challenge, setChallenge)}>
                WIN
            </button>
            <button onClick={() => loseChallenge(challenge, setChallenge)}>
                LOSE
            </button>
        </div>
    )
}

export default ModalChallenge
