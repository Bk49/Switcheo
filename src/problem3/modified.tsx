interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

class Datasource {
    // TODO: Implement datasource class
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getPrices() {
        return await axios.get(url);
    }
}

interface Props extends BoxProps {
    children;
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    // Can consider using @tanstack/react-query instead of using useEffect hook
    useEffect(() => {
        const datasource = new Datasource(
            "https://interview.switcheo.com/prices.json"
        );

        (() => {
            try {
                const priceData = await datasource.getPrices();
                setPrices(priceData);
            } catch (error: Error) {
                // Depending on application's error handling mechanism, change this part
                console.error(error);
            }
        })();
    }, [balances, prices]);

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case "Osmosis":
                return 100;
            case "Ethereum":
                return 50;
            case "Arbitrum":
                return 30;
            case "Zilliqa":
            case "Neo":
                return 20;
            default:
                return -99;
        }
    };

    const sortedBalances = useMemo(() => {
        return balances
            .filter(
                (balance: WalletBalance) =>
                    getPriority(balance.blockchain) > -99 && balance.amount <= 0
            )
            .sort(
                (lhs: WalletBalance, rhs: WalletBalance) =>
                    getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
            );
    }, [balances, prices]);

    return (
        <div {...props}>
            {!!prices &&
                sortedBalances.map((balance: WalletBalance, index: number) => (
                    <WalletRow
                        className={classes.row}
                        key={index}
                        amount={balance.amount}
                        usdValue={prices[balance.currency] * balance.amount}
                        formattedAmount={balance.amount.toFixed()}
                    />
                ))}
        </div>
    );
};
