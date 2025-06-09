def decimal_to_binary(decimal):
    """Converts a decimal number to its binary representation."""
    return bin(decimal)[2:].zfill(4)  # 4 bits for 4 variables

def count_ones(binary):
    """Counts the number of 1's in a binary string."""
    return binary.count('1')

def group_minterms(minterms):
    """Groups minterms based on the number of 1's."""
    groups = {}
    for minterm in minterms:
        binary = decimal_to_binary(minterm)
        ones_count = count_ones(binary)
        if ones_count not in groups:
            groups[ones_count] = []
        groups[ones_count].append(binary)
    return groups

def compare_and_combine(group1, group2):
    """Compares minterms in adjacent groups and combines them if they differ by only one bit."""
    combined = []
    for term1 in group1:
        for term2 in group2:
            diff_count = 0
            diff_pos = -1
            for i in range(len(term1)):
                if term1[i] != term2[i]:
                    diff_count += 1
                    diff_pos = i
            if diff_count == 1:
                combined.append(term1[:diff_pos] + '-' + term1[diff_pos+1:])
    return combined

def find_prime_implicants(groups):
    """Identifies prime implicants using the Quine-McCluskey method."""
    prime_implicants = []
    while groups:
        new_groups = {}
        for i in range(len(groups) - 1):
            combined = compare_and_combine(groups[i], groups[i+1])
            if combined:
                new_groups[i] = combined
        if not new_groups:
            for group in groups.values():
                prime_implicants.extend(group)
            break
        groups = new_groups
    return prime_implicants

def create_prime_implicant_table(prime_implicants, minterms):
    """Creates a table of prime implicants and minterms they cover."""
    table = []
    for prime in prime_implicants:
        row = [prime]
        for minterm in minterms:
            binary = decimal_to_binary(minterm)
            if '-' in prime:
                if all(prime[i] == binary[i] or prime[i] == '-' for i in range(len(prime))):
                    row.append('X')
                else:
                    row.append('')
            else:
                if prime == binary:
                    row.append('X')
                else:
                    row.append('')
        table.append(row)
    return table

def find_essential_prime_implicants(table):
    """Identifies essential prime implicants."""
    essential_prime_implicants = []
    for row in table:
        count = row.count('X')
        if count == 1:
            essential_prime_implicants.append(row[0])
    return essential_prime_implicants

def simplify_boolean_function(prime_implicants, essential_prime_implicants, minterms):
    """Simplifies the Boolean function."""
    simplified_function = []
    for prime in essential_prime_implicants:
        simplified_function.append(prime)
    return simplified_function

def print_boolean_function(simplified_function):
    """Prints the simplified Boolean function in SOP form."""
    terms = []
    for term in simplified_function:
        variables = ['A', 'B', 'C', 'D']
        term_str = ''
        for i in range(len(term)):
            if term[i] == '0':
                term_str += variables[i] + "'"
            elif term[i] == '1':
                term_str += variables[i]
        terms.append(term_str)
    print("Simplified Boolean function (SOP):", ' + '.join(terms))

# Test case
minterms = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14]
dont_cares = [4, 15]

# Combine minterms and don't-cares for initial grouping
all_terms = minterms + dont_cares
groups = group_minterms(all_terms)

# Find prime implicants
prime_implicants = find_prime_implicants(groups)

# Create prime implicant table
table = create_prime_implicant_table(prime_implicants, minterms)

# Find essential prime implicants
essential_prime_implicants = find_essential_prime_implicants(table)

# Simplify Boolean function
simplified_function = simplify_boolean_function(prime_implicants, essential_prime_implicants, minterms)

# Print simplified Boolean function
print_boolean_function(simplified_function)