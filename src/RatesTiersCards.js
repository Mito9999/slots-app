import React from 'react';

function RatesTiersCards({ data: { tiers, styles, selectTier, selectedTier, removeTier, setTiers } }) {

    const handlePercentageUpdate = ({ value }, index) => {
        const updatedTiers = [...tiers];
        const keystroke = value[value.length - 1];
        let percentValue = (isNaN(parseInt(value)) && keystroke !== '.') ? "" : value;

        if (keystroke === '.' && parseInt(tiers[index].percent) % 1 !== 0) {
            percentValue = value;
        }

        updatedTiers[index] = {
            ...updatedTiers[index],
            percent: percentValue
        }

        setTiers(updatedTiers);
    }

    const changePercentage = (index) => {
        const updatedTiers = [...tiers]
        updatedTiers[index] = {
            ...updatedTiers[index],
            perSelected: !updatedTiers[index].perSelected
        }

        setTiers(updatedTiers)
    }

    return (
        <>
            {tiers.map((tierData, index) => (
                <div key={index} className={styles.dataBox}>
                    <span className={styles.tierName}>
                        <span
                            className={styles.tierText}
                            onClick={selectTier}
                            style={{ fontWeight: index === parseInt(selectedTier) ? "bolder" : "normal" }}
                            id={index}
                        >
                            {tiers[index].tier}
                        </span>
                        <span className={styles.percentage}>
                            <span onClick={() => changePercentage(index)}>
                                {tierData.perSelected ?
                                    <form onSubmit={(e) => {
                                        changePercentage(index);
                                        e.preventDefault();
                                    }}>
                                        <input
                                            type="text"
                                            value={tierData.percent}
                                            onChange={(e) => handlePercentageUpdate(e.target, index)}
                                            autoFocus={true}
                                            className={styles.percentageUpdateInput}
                                        />
                                    </form> :
                                    tierData.percent}%
                        </span>
                            <span className={styles.removeIcon} onClick={() => removeTier(index)}>(X)</span>
                        </span>

                    </span>
                </div>
            ))}
        </>
    )
}

export default RatesTiersCards;
