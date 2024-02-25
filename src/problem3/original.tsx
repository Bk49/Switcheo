// Missing "blockchain" property
interface WalletBalance {
    currency: string;
    amount: number;
}

// Similar to WalletBalance, should extends the interface instead to obey DRY, but actually this interface is not needed for the actual fix by me
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

class Datasource {
    // TODO: Implement datasource class
}

// Need to declare children type
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    // children not even being used, can remove this line and replace "rest" with "props" directly
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const datasource = new Datasource(
            "https://interview.switcheo.com/prices.json"
        );
        // Use async await for readability and prevent nested thens in future developments
        datasource
            .getPrices()
            // prices is the same as the one declare at state, should name differently
            .then((prices) => {
                setPrices(prices);
            })
            .catch((error) => {
                // It is console.error
                console.err(error);
            });
    }, []);

    // Blockchain is should be typed as a string
    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            // Should make use of fallback cases of switch statements
            case "Zilliqa":
                return 20;
            case "Neo":
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                // Unused variable
                const balancePriority = getPriority(balance.blockchain);
                // Unnecessary nesting, should make use of && operator to increase code readability, lhsPriority is not declared too
                if (lhsPriority > -99) {
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                // Doesn't handle the case for equal priority, also, since both leftPriority and rightPriority are numbers just return their difference
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
    }, [balances, prices]);

    // The formattedBalances here are not being actually applied, it is stored in formattedBalances but not used
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed(),
        };
    });

    const rows = sortedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
            // prices here might not be fetched yet, need to ensure it is fetched before performing render
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className={classes.row}
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        }
    );

    return <div {...rest}>{rows}</div>;
};
