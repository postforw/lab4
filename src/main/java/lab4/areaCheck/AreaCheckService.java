package lab4.areaCheck;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;

@Service
@Validated
public class AreaCheckService {

    public boolean check(
            @DecimalMin(value = "-4") @DecimalMax(value = "4") double x,
            @DecimalMin(value = "-5", inclusive = false) @DecimalMax(value = "3", inclusive = false) double y,
            @DecimalMin(value = "-4") @DecimalMax(value = "4") double r
    ) {
        if (r < 0) {
            return doCheck(-x, -y, -r);
        }

        return doCheck(x, y, r);
    }

    private boolean doCheck(double x, double y, double r) {
        double halfR = r / 2;

        return ((x >= 0 && y >= 0 && y <= halfR - x / 2) ||
                (x >= 0 && y <= 0 && x < halfR && y > -r) ||
                (x <= 0 && y <= 0 && x * x + y * y <= halfR * halfR));
    }
}
